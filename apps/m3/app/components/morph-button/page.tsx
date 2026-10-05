"use client"

import * as React from "react"
import Link from "next/link"
import MorphButton from "@/registry/material-v1/ui/morph-button"
import {
  SearchIcon,
  AddIcon,
  ArrowRightIcon,
  FavoriteIcon,
  CheckIcon,
  CheckMarkIcon,
  SettingsIcon,
  ExternalLinkIcon,
  DownloadIcon,
  CopyIcon,
  InfoIcon,
  RefreshIcon,
  TrashIcon,
  CloseIcon,
  StarIcon,
} from "@/registry/material-v1/ui/icons"

type VariantType = "filled" | "elevated" | "tonal" | "outlined" | "text"
type ShapeType = "round" | "square" | "circle"
type SizeType = "xs" | "sm" | "md" | "lg" | "xl"
type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

interface ClusterButtonItem {
  id: string
  label: string
  shortLabel: string
  expandedLabel: string
  isExpanded: boolean
  variant: VariantType
  shape: ShapeType
  leadingIconName?: string
  trailingIconName?: string
}

export default function MorphButtonPage() {
  const [activeTab, setActiveTab] = React.useState<"interactive" | "code">("interactive")

  // Cluster buttons state for the interactive multi-button layout
  const [buttons, setButtons] = React.useState<ClusterButtonItem[]>([
    {
      id: "btn-1",
      label: "Download",
      shortLabel: "Download",
      expandedLabel: "Downloading file (4.2 MB)...",
      isExpanded: false,
      variant: "filled",
      shape: "round",
      leadingIconName: "download",
    },
    {
      id: "btn-2",
      label: "Favorite",
      shortLabel: "Favorite",
      expandedLabel: "Added to favorites",
      isExpanded: false,
      variant: "tonal",
      shape: "round",
      leadingIconName: "favorite",
    },
    {
      id: "btn-3",
      label: "Settings",
      shortLabel: "Settings",
      expandedLabel: "Configuration panel",
      isExpanded: false,
      variant: "outlined",
      shape: "round",
      leadingIconName: "settings",
    },
  ])

  // Global settings for cluster demonstration
  const [globalSize, setGlobalSize] = React.useState<SizeType>("sm")
  const [selectedButtonId, setSelectedButtonId] = React.useState<string>("btn-1")
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)
  const [packageManager, setPackageManager] = React.useState<PackageManager>("pnpm")

  const selectedButton = buttons.find((b) => b.id === selectedButtonId) || buttons[0]

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey(null)
    }, 2000)
  }

  const renderIconByName = (name?: string) => {
    switch (name) {
      case "search":
        return <SearchIcon />
      case "add":
        return <AddIcon />
      case "arrow":
        return <ArrowRightIcon />
      case "favorite":
        return <FavoriteIcon />
      case "check":
        return <CheckIcon />
      case "settings":
        return <SettingsIcon />
      case "download":
        return <DownloadIcon />
      case "refresh":
        return <RefreshIcon />
      case "trash":
        return <TrashIcon />
      case "close":
        return <CloseIcon />
      case "star":
        return <StarIcon />
      case "external":
        return <ExternalLinkIcon />
      default:
        return undefined
    }
  }

  // Toggle expansion of an individual button
  const toggleButtonExpansion = (id: string) => {
    setButtons((prev) =>
      prev.map((btn) => {
        if (btn.id === id) {
          const nextExpanded = !btn.isExpanded
          return {
            ...btn,
            isExpanded: nextExpanded,
            label: nextExpanded ? btn.expandedLabel : btn.shortLabel,
          }
        }
        return btn
      })
    )
  }

  // Add a new button to the cluster
  const addButtonToCluster = () => {
    const nextIndex = buttons.length + 1
    const newBtn: ClusterButtonItem = {
      id: `btn-${Date.now()}`,
      label: `Action ${nextIndex}`,
      shortLabel: `Action ${nextIndex}`,
      expandedLabel: `Expanded Action ${nextIndex}`,
      isExpanded: false,
      variant: nextIndex % 2 === 0 ? "tonal" : "outlined",
      shape: "round",
      leadingIconName: "star",
    }
    setButtons((prev) => [...prev, newBtn])
    setSelectedButtonId(newBtn.id)
  }

  // Remove selected button from the cluster
  const removeButtonFromCluster = (id: string) => {
    if (buttons.length <= 1) return
    const remaining = buttons.filter((b) => b.id !== id)
    setButtons(remaining)
    setSelectedButtonId(remaining[0].id)
  }

  // Update selected button fields
  const updateSelectedButton = (patch: Partial<ClusterButtonItem>) => {
    setButtons((prev) =>
      prev.map((btn) => (btn.id === selectedButtonId ? { ...btn, ...patch } : btn))
    )
  }

  // Predefined scenario loaders
  const loadScenario = (type: "cart" | "form" | "file") => {
    if (type === "cart") {
      setButtons([
        {
          id: "cart-1",
          label: "Add to cart",
          shortLabel: "Add to cart",
          expandedLabel: "Added item to cart!",
          isExpanded: false,
          variant: "filled",
          shape: "round",
          leadingIconName: "add",
        },
        {
          id: "cart-2",
          label: "Cart (2)",
          shortLabel: "Cart (2)",
          expandedLabel: "Review 2 items in cart",
          isExpanded: false,
          variant: "tonal",
          shape: "round",
          leadingIconName: "search",
        },
        {
          id: "cart-3",
          label: "Checkout",
          shortLabel: "Checkout",
          expandedLabel: "Proceeding to checkout...",
          isExpanded: false,
          variant: "outlined",
          shape: "round",
          trailingIconName: "arrow",
        },
      ])
      setSelectedButtonId("cart-1")
    } else if (type === "form") {
      setButtons([
        {
          id: "form-1",
          label: "Save draft",
          shortLabel: "Save draft",
          expandedLabel: "Draft saved at 10:45 AM",
          isExpanded: false,
          variant: "tonal",
          shape: "round",
          leadingIconName: "check",
        },
        {
          id: "form-2",
          label: "Discard",
          shortLabel: "Discard",
          expandedLabel: "Confirm discarding changes?",
          isExpanded: false,
          variant: "text",
          shape: "round",
          leadingIconName: "trash",
        },
        {
          id: "form-3",
          label: "Publish",
          shortLabel: "Publish",
          expandedLabel: "Publishing article live...",
          isExpanded: false,
          variant: "filled",
          shape: "round",
          leadingIconName: "star",
        },
      ])
      setSelectedButtonId("form-1")
    } else {
      setButtons([
        {
          id: "file-1",
          label: "Download",
          shortLabel: "Download",
          expandedLabel: "Downloading file (4.2 MB)...",
          isExpanded: false,
          variant: "filled",
          shape: "round",
          leadingIconName: "download",
        },
        {
          id: "file-2",
          label: "Favorite",
          shortLabel: "Favorite",
          expandedLabel: "Added to favorites",
          isExpanded: false,
          variant: "tonal",
          shape: "round",
          leadingIconName: "favorite",
        },
        {
          id: "file-3",
          label: "Share",
          shortLabel: "Share",
          expandedLabel: "Shareable link generated",
          isExpanded: false,
          variant: "outlined",
          shape: "round",
          leadingIconName: "external",
        },
      ])
      setSelectedButtonId("file-1")
    }
  }

  const generateDynamicSnippet = () => {
    return `import { MorphButton } from "@/components/ui/morph-button"\nimport { ${selectedButton.leadingIconName ? selectedButton.leadingIconName.charAt(0).toUpperCase() + selectedButton.leadingIconName.slice(1) + "Icon" : "DownloadIcon"} } from "@/components/ui/icons"\n\nexport function ActionGroup() {\n  const [expanded, setExpanded] = React.useState(false)\n\n  return (\n    <div className="flex items-center gap-3">\n      <MorphButton\n        variant="${selectedButton.variant}"\n        size="${globalSize}"\n        shape="${selectedButton.shape}"\n        leadingIcon={<${selectedButton.leadingIconName ? selectedButton.leadingIconName.charAt(0).toUpperCase() + selectedButton.leadingIconName.slice(1) + "Icon" : "DownloadIcon"} />}\n        onClick={() => setExpanded(!expanded)}\n      >\n        {expanded ? "${selectedButton.expandedLabel}" : "${selectedButton.shortLabel}"}\n      </MorphButton>\n    </div>\n  )\n}`
  }

  const getInstallCommand = (pm: PackageManager) => {
    switch (pm) {
      case "pnpm":
        return "pnpm dlx m3-ui add morph-button"
      case "npm":
        return "npx m3-ui add morph-button"
      case "yarn":
        return "yarn dlx m3-ui add morph-button"
      case "bun":
        return "bunx --bun m3-ui add morph-button"
    }
  }

  const rawMorphButtonSource = `"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { Slottable } from "radix-ui/slot"
import { cn } from "cn"
import { ButtonProps, buttonVariants } from "./button"

export interface MorphButtonProps extends ButtonProps {}

export function MorphButton({
  className,
  variant = "filled",
  size = "sm",
  asChild = false,
  shape = "round",
  toggle = "none",
  leadingIcon,
  trailingIcon,
  style,
  children,
  ref,
  ...props
}: MorphButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const innerRef = React.useRef<HTMLSpanElement>(null)
  const [measuredWidth, setMeasuredWidth] = React.useState<number | undefined>(undefined)

  const setButtonRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && typeof ref === "object" && "current" in ref) {
        ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      }
    },
    [ref]
  )

  React.useLayoutEffect(() => {
    if (!buttonRef.current || !innerRef.current) return

    const measure = () => {
      if (!buttonRef.current || !innerRef.current) return
      const computed = window.getComputedStyle(buttonRef.current)
      const pl = parseFloat(computed.paddingLeft) || 0
      const pr = parseFloat(computed.paddingRight) || 0
      const contentW = innerRef.current.scrollWidth
      const newWidth = Math.ceil(contentW + pl + pr)
      setMeasuredWidth(newWidth)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(innerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [children, leadingIcon, trailingIcon, size, shape])

  return (
    <Comp
      ref={setButtonRef}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-toggle={toggle}
      style={{
        ...(measuredWidth ? { width: \`\${measuredWidth}px\` } : undefined),
        ...style,
      }}
      className={cn(buttonVariants({ variant, size, shape, toggle }), className)}
      {...props}
    >
      <span
        ref={innerRef}
        className="inline-flex items-center justify-center gap-[inherit] whitespace-nowrap overflow-visible"
      >
        {leadingIcon && <span className="flex-shrink-0">{leadingIcon}</span>}
        {asChild ? <Slottable>{children}</Slottable> : children}
        {trailingIcon && <span className="flex-shrink-0">{trailingIcon}</span>}
      </span>
    </Comp>
  )
}

export default MorphButton`

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Breadcrumb & Header */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-on-surface">MorphButton</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-on-surface">
              MorphButton
            </h1>
            <p className="text-base text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
              An interactive button that calculates its intrinsic width via a ResizeObserver and smoothly interpolates dimensions during content, icon, and state changes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
              Component #2
            </span>
          </div>
        </div>
      </section>

      {/* Development Status Callout */}
      <section className="rounded-xl border border-outline-variant/60 bg-surface-container-low p-4 sm:p-5 flex items-start gap-3.5">
        <div className="text-primary mt-0.5 shrink-0">
          <InfoIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-1 text-sm text-on-surface-variant">
          <p className="font-semibold text-on-surface">
            Active Development Candidate
          </p>
          <p className="leading-relaxed">
            MorphButton extends the stateless Button component by measuring content dimensions dynamically. Notice how neighboring buttons in a layout smoothly reposition when a button expands or compresses.
          </p>
        </div>
      </section>

      {/* Phase Navigation Tabs */}
      <section className="flex flex-col gap-6">
        <div className="flex border-b border-outline-variant/40 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("interactive")}
            className={`pb-3 px-4 text-sm font-medium transition-colors relative cursor-pointer ${
              activeTab === "interactive"
                ? "text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Interactive Playground (Cluster Morph)
            {activeTab === "interactive" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`pb-3 px-4 text-sm font-medium transition-colors relative cursor-pointer ${
              activeTab === "code"
                ? "text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Code & Installation
            {activeTab === "code" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        </div>

        {/* Phase 1: Interactive Playground */}
        {activeTab === "interactive" && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
            {/* Live Canvas (Left Column) */}
            <div className="w-full lg:col-span-7 flex flex-col gap-6">
              {/* Dynamic Cluster Canvas */}
              <div className="w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-6 sm:p-10 min-h-[380px] flex flex-col justify-between relative overflow-hidden transition-all shadow-xs">
                {/* Canvas Controls Header */}
                <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                      Interactive Button Row
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      ({buttons.length} buttons in flex layout)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={addButtonToCluster}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                    >
                      <AddIcon className="size-3.5" />
                      <span>Add Button</span>
                    </button>
                  </div>
                </div>

                {/* The Cluster: Live Morphing Buttons in a Row */}
                <div className="w-full py-12 flex flex-wrap items-center justify-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]">
                  {buttons.map((btn) => (
                    <div key={btn.id} className="relative group">
                      <MorphButton
                        variant={btn.variant}
                        shape={btn.shape}
                        size={globalSize}
                        leadingIcon={renderIconByName(btn.leadingIconName)}
                        trailingIcon={renderIconByName(btn.trailingIconName)}
                        onClick={() => toggleButtonExpansion(btn.id)}
                        className={`transition-all ${
                          selectedButtonId === btn.id ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""
                        }`}
                      >
                        {btn.label}
                      </MorphButton>

                      {/* Select indicator */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedButtonId(btn.id)
                        }}
                        className="absolute -top-2 -right-2 size-5 rounded-full bg-surface-container-highest text-on-surface border border-outline-variant/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] cursor-pointer"
                        title="Configure this button"
                      >
                        ⚙
                      </button>
                    </div>
                  ))}
                </div>

                {/* Hint banner */}
                <div className="w-full rounded-xl bg-surface-container-low/70 border border-outline-variant/30 p-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                    Click any button above to toggle its label and watch sibling buttons glide together!
                  </span>

                  {buttons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeButtonFromCluster(selectedButtonId)}
                      className="text-error hover:underline cursor-pointer flex items-center gap-1 font-medium"
                    >
                      <TrashIcon className="size-3.5" />
                      <span>Remove Selected</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic Code Preview Snippet */}
              <div className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-highest p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                    Selected Button Code Snippet
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(generateDynamicSnippet(), "dynamic-snippet")}
                    className="flex items-center gap-1.5 text-xs text-primary font-medium hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {copiedKey === "dynamic-snippet" ? (
                      <>
                        <CheckMarkIcon />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-on-surface overflow-x-auto p-2 bg-surface-container/60 rounded-md">
                  <code>{generateDynamicSnippet()}</code>
                </pre>
              </div>

              {/* Quick Scenarios Panel */}
              <div className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-on-surface">
                    Preset Morph Scenarios
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Load pre-configured multi-button workflows to observe how width shifts dynamically affect sibling layout density.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => loadScenario("file")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-on-surface border border-outline-variant/60 hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    File Download & Share
                  </button>
                  <button
                    type="button"
                    onClick={() => loadScenario("cart")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-on-surface border border-outline-variant/60 hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    Shopping Cart Flow
                  </button>
                  <button
                    type="button"
                    onClick={() => loadScenario("form")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-on-surface border border-outline-variant/60 hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    Form Publishing State
                  </button>
                </div>
              </div>
            </div>

            {/* Inspector & Controls Panel (Right Column) */}
            <div className="w-full lg:col-span-5 rounded-2xl border border-outline-variant/50 bg-surface-container-low p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
                <h2 className="text-base font-semibold text-on-surface">
                  Cluster Controls
                </h2>
                <span className="text-xs font-mono text-primary bg-primary-container px-2 py-0.5 rounded-full font-medium">
                  Active: {selectedButton.label.slice(0, 15)}
                </span>
              </div>

              {/* Global Size Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Cluster Size Scale
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(["xs", "sm", "md", "lg", "xl"] as SizeType[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setGlobalSize(sz)}
                      className={`py-2 text-xs rounded-lg font-medium uppercase transition-all cursor-pointer ${
                        globalSize === sz
                          ? "bg-primary text-on-primary shadow-xs"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Button Variant */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Selected Button Variant
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["filled", "tonal", "elevated", "outlined", "text"] as VariantType[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => updateSelectedButton({ variant: v })}
                      className={`px-3 py-2 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        selectedButton.variant === v
                          ? "bg-primary text-on-primary shadow-xs"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Button Shape */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Selected Button Shape
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["round", "square", "circle"] as ShapeType[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateSelectedButton({ shape: s })}
                      className={`px-3 py-2 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        selectedButton.shape === s
                          ? "bg-primary text-on-primary shadow-xs"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preloaded Icon Selectors from icons.tsx */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Preloaded Leading Icon (from icons.tsx)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["none", "download", "favorite", "settings", "search", "add", "refresh", "star"].map((iconKey) => (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() =>
                        updateSelectedButton({
                          leadingIconName: iconKey === "none" ? undefined : iconKey,
                        })
                      }
                      className={`px-2 py-1.5 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        (iconKey === "none" && !selectedButton.leadingIconName) ||
                        selectedButton.leadingIconName === iconKey
                          ? "bg-secondary-container text-on-secondary-container font-semibold"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {iconKey}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Length Morphing Test Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="morph-short-label" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Compact Text
                </label>
                <input
                  id="morph-short-label"
                  type="text"
                  value={selectedButton.shortLabel}
                  onChange={(e) => {
                    const val = e.target.value
                    updateSelectedButton({
                      shortLabel: val,
                      label: selectedButton.isExpanded ? selectedButton.expandedLabel : val,
                    })
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-surface border border-outline-variant/80 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="morph-expanded-label" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Expanded Text (Triggered on Click)
                </label>
                <input
                  id="morph-expanded-label"
                  type="text"
                  value={selectedButton.expandedLabel}
                  onChange={(e) => {
                    const val = e.target.value
                    updateSelectedButton({
                      expandedLabel: val,
                      label: selectedButton.isExpanded ? val : selectedButton.shortLabel,
                    })
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-surface border border-outline-variant/80 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Code & Installation */}
        {activeTab === "code" && (
          <div className="flex flex-col gap-8">
            {/* CLI Installation Step */}
            <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-on-surface">
                  1. Install via M3 CLI
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Run the CLI command to download MorphButton into your components directory.
                </p>
              </div>

              {/* Package Manager Selector */}
              <div className="flex items-center gap-1.5 border-b border-outline-variant/40 pb-2">
                {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setPackageManager(pm)}
                    className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                      packageManager === pm
                        ? "bg-secondary-container text-on-secondary-container font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>

              {/* Command Box */}
              <div className="flex items-center justify-between rounded-xl bg-surface-container-highest px-4 py-3 font-mono text-sm text-on-surface border border-outline-variant/40">
                <span className="overflow-x-auto select-all">{getInstallCommand(packageManager)}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(getInstallCommand(packageManager), "cli-cmd")}
                  className="ml-3 flex items-center gap-1 text-xs text-primary font-medium hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                  aria-label="Copy CLI Command"
                >
                  {copiedKey === "cli-cmd" ? (
                    <>
                      <CheckMarkIcon />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Icons Dependency */}
            <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-on-surface">
                  2. Icons Component
                </h2>
                <p className="text-sm text-on-surface-variant">
                  MorphButton utilizes standardized SVGs from the centralized Material Symbols library.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-surface-container-highest px-4 py-3 font-mono text-sm text-on-surface border border-outline-variant/40">
                <span className="overflow-x-auto select-all">
                  {packageManager === "pnpm"
                    ? "pnpm dlx m3-ui add icons"
                    : "npx m3-ui add icons"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      packageManager === "pnpm"
                        ? "pnpm dlx m3-ui add icons"
                        : "npx m3-ui add icons",
                      "icons-cmd"
                    )
                  }
                  className="ml-3 flex items-center gap-1 text-xs text-primary font-medium hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                >
                  {copiedKey === "icons-cmd" ? (
                    <>
                      <CheckMarkIcon />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Component Source Code */}
            <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-on-surface">
                    3. Component Source Code
                  </h2>
                  <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                    registry/material-v1/ui/morph-button.tsx
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(rawMorphButtonSource, "raw-source")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface-container text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  {copiedKey === "raw-source" ? (
                    <>
                      <CheckMarkIcon />
                      <span>Copied Source!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      <span>Copy File</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl border border-outline-variant/40 bg-surface-container-highest p-4 max-h-[460px] overflow-y-auto">
                <pre className="font-mono text-xs text-on-surface leading-relaxed">
                  <code>{rawMorphButtonSource}</code>
                </pre>
              </div>
            </div>

            {/* How It Works Architecture Note */}
            <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-6 flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-on-surface">
                4. Architecture: ResizeObserver Width Interpolation
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Standard CSS transitions cannot animate between <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">width: auto</code> states without hardcoded widths. MorphButton addresses this by measuring the inner content <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">scrollWidth</code> plus container padding via <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">getComputedStyle</code> inside a <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">ResizeObserver</code>.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                When content length expands or contracts, an inline pixel width is smoothly calculated and applied, allowing CSS <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">cubic-bezier(0.2, 0, 0, 1)</code> curves to smoothly interpolate dimensions without layout pops.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
