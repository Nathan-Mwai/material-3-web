"use client"

import * as React from "react"
import Link from "next/link"
import Button from "@/registry/material-v1/ui/button"

// Preloaded Material Symbols SVGs
const SearchIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const AddIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5v14" />
  </svg>
)

const ArrowRightIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const FavoriteIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

const CheckIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const SettingsIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const ExternalLinkIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
)

const DownloadIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
)

const CopyIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CheckMarkIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const InfoIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
)

type VariantType = "filled" | "elevated" | "tonal" | "outlined" | "text"
type ShapeType = "round" | "square" | "circle"
type SizeType = "xs" | "sm" | "md" | "lg" | "xl"
type ToggleType = "none" | "selected" | "unselected"
type LeadingIconChoice = "none" | "search" | "add" | "favorite" | "settings"
type TrailingIconChoice = "none" | "arrow" | "check" | "external" | "download"
type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export default function ButtonPage() {
  const [activeTab, setActiveTab] = React.useState<"interactive" | "code">("interactive")

  // Playground state
  const [variant, setVariant] = React.useState<VariantType>("filled")
  const [shape, setShape] = React.useState<ShapeType>("round")
  const [size, setSize] = React.useState<SizeType>("sm")
  const [toggle, setToggle] = React.useState<ToggleType>("none")
  const [disabled, setDisabled] = React.useState(false)
  const [leadingIconChoice, setLeadingIconChoice] = React.useState<LeadingIconChoice>("none")
  const [trailingIconChoice, setTrailingIconChoice] = React.useState<TrailingIconChoice>("none")
  const [buttonText, setButtonText] = React.useState("Action Button")

  // Interactive toggle button demo state
  const [isDemoSelected, setIsDemoSelected] = React.useState(false)

  // Copy status indicators
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)
  const [packageManager, setPackageManager] = React.useState<PackageManager>("pnpm")

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey(null)
    }, 2000)
  }

  // Helper to render icons
  const renderLeadingIcon = (choice: LeadingIconChoice) => {
    switch (choice) {
      case "search":
        return <SearchIcon />
      case "add":
        return <AddIcon />
      case "favorite":
        return <FavoriteIcon />
      case "settings":
        return <SettingsIcon />
      default:
        return undefined
    }
  }

  const renderTrailingIcon = (choice: TrailingIconChoice) => {
    switch (choice) {
      case "arrow":
        return <ArrowRightIcon />
      case "check":
        return <CheckIcon />
      case "external":
        return <ExternalLinkIcon />
      case "download":
        return <DownloadIcon />
      default:
        return undefined
    }
  }

  // Generate dynamic JSX based on playground state
  const generateDynamicCode = () => {
    const propsList: string[] = []
    if (variant !== "filled") propsList.push(`variant="${variant}"`)
    if (size !== "sm") propsList.push(`size="${size}"`)
    if (shape !== "round") propsList.push(`shape="${shape}"`)
    if (toggle !== "none") propsList.push(`toggle="${toggle}"`)
    if (disabled) propsList.push("disabled")
    if (leadingIconChoice !== "none") propsList.push(`leadingIcon={<${leadingIconChoice === "search" ? "Search" : leadingIconChoice === "add" ? "Add" : leadingIconChoice === "favorite" ? "Favorite" : "Settings"}Icon />}`)
    if (trailingIconChoice !== "none") propsList.push(`trailingIcon={<${trailingIconChoice === "arrow" ? "ArrowRight" : trailingIconChoice === "check" ? "Check" : trailingIconChoice === "external" ? "ExternalLink" : "Download"}Icon />}`)

    const formattedProps = propsList.length > 0 ? " " + propsList.join(" ") : ""
    return `<Button${formattedProps}>\n  ${shape === "circle" ? "" : buttonText}\n</Button>`
  }

  const getInstallCommand = (pm: PackageManager) => {
    switch (pm) {
      case "pnpm":
        return "pnpm dlx m3-ui add button"
      case "npm":
        return "npx m3-ui add button"
      case "yarn":
        return "yarn dlx m3-ui add button"
      case "bun":
        return "bunx --bun m3-ui add button"
    }
  }

  const rawButtonSource = `import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Slot } from "radix-ui"
import { cn } from "cn"
import { Slottable } from "radix-ui/slot"

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "font-medium whitespace-nowrap outline-none cursor-pointer transform-gpu",
    "transition-[border-radius,width,transform,box-shadow,background-color,color,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:duration-300 active:scale-[0.98]",
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    "focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface",
    "disabled:pointer-events-none disabled:opacity-38 disabled:shadow-none disabled:scale-100",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        filled: "",
        elevated: "",
        tonal: "",
        outlined: "",
        text: ""
      },
      shape: {
        round: "",
        square: "",
        circle: "aspect-square p-0 min-w-0",
      },
      size: {
        xs: "h-8 px-3 gap-1 text-xs active:rounded-[8px] [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px]",
        sm: "h-10 px-4 gap-2 text-sm active:rounded-[8px] [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px]",
        md: "h-14 px-6 gap-2 text-base active:rounded-[12px] [&_svg]:size-6 [&_.material-symbols-outlined]:text-[24px]",
        lg: "h-24 px-12 gap-3 text-2xl active:rounded-[16px] [&_svg]:size-8 [&_.material-symbols-outlined]:text-[32px]",
        xl: "h-[136px] px-16 gap-4 text-4xl active:rounded-[16px] [&_svg]:size-10 [&_.material-symbols-outlined]:text-[40px]",
      },
      toggle: {
        none: "",
        selected: "",
        unselected: ""
      },
    },
    compoundVariants: [
      { shape: "round", size: "xs", className: "rounded-[16px] min-w-[48px]" },
      { shape: "round", size: "sm", className: "rounded-[20px] min-w-[48px]" },
      { shape: "round", size: "md", className: "rounded-[28px] min-w-[64px]" },
      { shape: "round", size: "lg", className: "rounded-[48px] min-w-[96px]" },
      { shape: "round", size: "xl", className: "rounded-[68px] min-w-[128px]" },

      { shape: "square", size: "xs", className: "rounded-[12px] min-w-[48px]" },
      { shape: "square", size: "sm", className: "rounded-[12px] min-w-[48px]" },
      { shape: "square", size: "md", className: "rounded-[16px] min-w-[64px]" },
      { shape: "square", size: "lg", className: "rounded-[28px] min-w-[96px]" },
      { shape: "square", size: "xl", className: "rounded-[28px] min-w-[128px]" },

      { shape: "circle", size: "xs", className: "w-8 rounded-[16px]" },
      { shape: "circle", size: "sm", className: "w-10 rounded-[20px]" },
      { shape: "circle", size: "md", className: "w-14 rounded-[28px]" },
      { shape: "circle", size: "lg", className: "w-24 rounded-[48px]" },
      { shape: "circle", size: "xl", className: "w-[136px] rounded-[68px]" },

      { variant: "elevated", toggle: "none", className: "bg-m3-surface-container-low text-m3-primary shadow-xs hover:shadow-md active:shadow-xs" },
      { variant: "elevated", toggle: "unselected", className: "bg-m3-surface-container-low text-m3-primary border border-m3-outline-variant shadow-none hover:bg-m3-surface-container active:bg-m3-surface-container-high" },
      { variant: "elevated", toggle: "selected", className: "bg-m3-primary text-m3-on-primary shadow-xs hover:shadow-md active:shadow-xs" },

      { variant: "filled", toggle: "none", className: "bg-m3-primary text-m3-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "filled", toggle: "unselected", className: "bg-m3-surface-container text-m3-on-surface hover:bg-m3-surface-container-high active:bg-m3-surface-container-highest" },
      { variant: "filled", toggle: "selected", className: "bg-m3-primary text-m3-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },

      { variant: "tonal", toggle: "none", className: "bg-m3-secondary-container text-m3-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "tonal", toggle: "unselected", className: "bg-m3-surface-container-low text-m3-on-surface-variant hover:bg-m3-surface-container active:bg-m3-surface-container-high" },
      { variant: "tonal", toggle: "selected", className: "bg-m3-secondary-container text-m3-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },

      { variant: "outlined", toggle: "none", className: "bg-transparent text-m3-primary border border-m3-outline hover:bg-m3-primary/8 active:bg-m3-primary/12" },
      { variant: "outlined", toggle: "unselected", className: "bg-transparent text-m3-on-surface border border-m3-outline hover:bg-m3-on-surface/8 active:bg-m3-on-surface/12" },
      { variant: "outlined", toggle: "selected", className: "bg-m3-inverse-surface text-m3-inverse-on-surface border border-transparent hover:opacity-95 active:opacity-90" },

      { variant: "text", className: "bg-transparent text-m3-primary hover:bg-m3-primary/8 active:bg-m3-primary/12" },
    ],
    defaultVariants: {
      variant: "filled",
      shape: "round",
      size: "sm",
      toggle: "none"
    }
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

function Button({
  className,
  variant = "filled",
  size = "sm",
  asChild = false,
  shape = "round",
  toggle = "none",
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-toggle={toggle}
      className={cn(buttonVariants({ variant, size, shape, toggle }), className)}
      {...props}
    >
      {leadingIcon && <span className="flex-shrink-0">{leadingIcon}</span>}
      {asChild ? <Slottable>{children}</Slottable> : children}
      {trailingIcon && <span className="flex-shrink-0">{trailingIcon}</span>}
    </Comp>
  )
}

export { Button, buttonVariants }
export default Button`

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Breadcrumb & Header Title */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-m3-on-surface-variant">
          <Link href="/" className="hover:text-m3-primary transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-m3-on-surface">Button</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-m3-on-surface">
              Button
            </h1>
            <p className="text-base text-m3-on-surface-variant mt-1.5 max-w-2xl">
              Buttons enable people to initiate actions, make choices, and trigger state transitions. Material 3 defines five distinct emphasis levels with fluid shape-morphing states.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-m3-tertiary-container text-m3-on-tertiary-container">
              Alpha Component
            </span>
          </div>
        </div>
      </section>

      {/* Alpha Development Notice Callout */}
      <section className="rounded-xl border border-m3-outline-variant/60 bg-m3-surface-container-low p-4 sm:p-5 flex items-start gap-3.5">
        <div className="text-m3-primary mt-0.5 shrink-0">
          <InfoIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-1 text-sm text-m3-on-surface-variant">
          <p className="font-semibold text-m3-on-surface">
            Active Development Notice
          </p>
          <p className="leading-relaxed">
            This component registry is under active construction. The Button is our primary release candidate. APIs, compound variants, and token structures are currently stabilizing before the v1.0 milestone.
          </p>
        </div>
      </section>

      {/* Phase Navigation Tabs (Interactive Preview vs Code & Installation) */}
      <section className="flex flex-col gap-6">
        <div className="flex border-b border-m3-outline-variant/40 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("interactive")}
            className={`pb-3 px-4 text-sm font-medium transition-colors relative cursor-pointer ${
              activeTab === "interactive"
                ? "text-m3-primary"
                : "text-m3-on-surface-variant hover:text-m3-on-surface"
            }`}
          >
            Interactive Playground
            {activeTab === "interactive" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-m3-primary rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`pb-3 px-4 text-sm font-medium transition-colors relative cursor-pointer ${
              activeTab === "code"
                ? "text-m3-primary"
                : "text-m3-on-surface-variant hover:text-m3-on-surface"
            }`}
          >
            Code & Installation
            {activeTab === "code" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-m3-primary rounded-t-full" />
            )}
          </button>
        </div>

        {/* Phase 1: Interactive Playground */}
        {activeTab === "interactive" && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
            {/* Live Canvas (Left Column) */}
            <div className="w-full lg:col-span-7 flex flex-col gap-6">
              {/* Canvas Card */}
              <div className="w-full rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-lowest p-8 sm:p-12 min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-xs">
                {/* Canvas background subtle pattern */}
                <div className="absolute inset-0 bg-radial from-m3-surface-container-low/50 to-transparent pointer-events-none" />

                {/* The Live Button */}
                <div className="z-10 flex flex-col items-center gap-3">
                  <Button
                    variant={variant}
                    shape={shape}
                    size={size}
                    toggle={toggle}
                    disabled={disabled}
                    leadingIcon={renderLeadingIcon(leadingIconChoice)}
                    trailingIcon={renderTrailingIcon(trailingIconChoice)}
                  >
                    {shape === "circle" ? (
                      leadingIconChoice !== "none" ? (
                        renderLeadingIcon(leadingIconChoice)
                      ) : (
                        <SearchIcon />
                      )
                    ) : (
                      buttonText
                    )}
                  </Button>

                  <span className="text-xs text-m3-on-surface-variant/70 font-mono mt-4">
                    variant: &ldquo;{variant}&rdquo; | shape: &ldquo;{shape}&rdquo; | size: &ldquo;{size}&rdquo;
                  </span>
                </div>
              </div>

              {/* Dynamic Quick Code Output */}
              <div className="w-full rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-highest p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-m3-on-surface-variant uppercase tracking-wider">
                    Live Component Snippet
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(generateDynamicCode(), "dynamic-snippet")}
                    className="flex items-center gap-1.5 text-xs text-m3-primary font-medium hover:opacity-80 transition-opacity cursor-pointer"
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
                <pre className="font-mono text-xs sm:text-sm text-m3-on-surface overflow-x-auto p-2 bg-m3-surface-container/60 rounded-md">
                  <code>{generateDynamicCode()}</code>
                </pre>
              </div>

              {/* Interactive Toggle Button Feature Demo */}
              <div className="w-full rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-m3-on-surface">
                    Interactive Toggle Morphing Demo
                  </h3>
                  <p className="text-xs text-m3-on-surface-variant">
                    Click to observe Material 3 shape compression and tonal color shift between selected and unselected states.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="tonal"
                    shape="round"
                    toggle={isDemoSelected ? "selected" : "unselected"}
                    leadingIcon={isDemoSelected ? <CheckIcon /> : <FavoriteIcon />}
                    onClick={() => setIsDemoSelected(!isDemoSelected)}
                  >
                    {isDemoSelected ? "Favorited" : "Add to favorites"}
                  </Button>

                  <span className="text-xs text-m3-on-surface-variant font-mono">
                    toggle: &ldquo;{isDemoSelected ? "selected" : "unselected"}&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* Playground Controls Panel (Right Column) */}
            <div className="w-full lg:col-span-5 rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-low p-6 flex flex-col gap-6">
              <h2 className="text-base font-semibold text-m3-on-surface border-b border-m3-outline-variant/40 pb-3">
                Playground Controls
              </h2>

              {/* Variant Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                  Variant
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["filled", "tonal", "elevated", "outlined", "text"] as VariantType[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVariant(v)}
                      className={`px-3 py-2 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        variant === v
                          ? "bg-m3-primary text-m3-on-primary shadow-xs"
                          : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-container-high"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                  Shape
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["round", "square", "circle"] as ShapeType[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShape(s)}
                      className={`px-3 py-2 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        shape === s
                          ? "bg-m3-primary text-m3-on-primary shadow-xs"
                          : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-container-high"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                  Size
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(["xs", "sm", "md", "lg", "xl"] as SizeType[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSize(sz)}
                      className={`py-2 text-xs rounded-lg font-medium uppercase transition-all cursor-pointer ${
                        size === sz
                          ? "bg-m3-primary text-m3-on-primary shadow-xs"
                          : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-container-high"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preloaded Leading Icon */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                  Leading Icon
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["none", "search", "add", "favorite", "settings"] as LeadingIconChoice[]).map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setLeadingIconChoice(icon)}
                      className={`px-2.5 py-1.5 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        leadingIconChoice === icon
                          ? "bg-m3-secondary-container text-m3-on-secondary-container font-semibold"
                          : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-container-high"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preloaded Trailing Icon */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                  Trailing Icon
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["none", "arrow", "check", "external", "download"] as TrailingIconChoice[]).map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setTrailingIconChoice(icon)}
                      className={`px-2.5 py-1.5 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        trailingIconChoice === icon
                          ? "bg-m3-secondary-container text-m3-on-secondary-container font-semibold"
                          : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-container-high"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Mode Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                  Toggle Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["none", "unselected", "selected"] as ToggleType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setToggle(t)}
                      className={`px-2 py-1.5 text-xs rounded-lg font-medium capitalize transition-all cursor-pointer ${
                        toggle === t
                          ? "bg-m3-secondary-container text-m3-on-secondary-container font-semibold"
                          : "bg-m3-surface text-m3-on-surface-variant hover:bg-m3-surface-container-high"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Label Text Input */}
              {shape !== "circle" && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="button-label-input" className="text-xs font-semibold text-m3-on-surface-variant uppercase tracking-wider">
                    Label Text
                  </label>
                  <input
                    id="button-label-input"
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-m3-surface border border-m3-outline-variant/80 text-m3-on-surface focus:outline-none focus:ring-2 focus:ring-m3-primary"
                  />
                </div>
              )}

              {/* Disabled State Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-m3-outline-variant/30">
                <span className="text-sm font-medium text-m3-on-surface">Disabled State</span>
                <button
                  type="button"
                  onClick={() => setDisabled(!disabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    disabled ? "bg-m3-primary" : "bg-m3-outline-variant/60"
                  }`}
                  aria-pressed={disabled}
                >
                  <div
                    className={`size-5 rounded-full bg-m3-surface shadow-xs transition-transform ${
                      disabled ? "translate-x-6 bg-m3-on-primary" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Code & Installation */}
        {activeTab === "code" && (
          <div className="flex flex-col gap-8">
            {/* CLI Installation Step */}
            <div className="rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-low p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-m3-on-surface">
                  1. Install via M3 CLI
                </h2>
                <p className="text-sm text-m3-on-surface-variant">
                  Run the M3 CLI command to download the Button component source directly into your components folder.
                </p>
              </div>

              {/* Package Manager Selector */}
              <div className="flex items-center gap-1.5 border-b border-m3-outline-variant/40 pb-2">
                {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setPackageManager(pm)}
                    className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                      packageManager === pm
                        ? "bg-m3-secondary-container text-m3-on-secondary-container font-semibold"
                        : "text-m3-on-surface-variant hover:text-m3-on-surface"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>

              {/* Command Box */}
              <div className="flex items-center justify-between rounded-xl bg-m3-surface-container-highest px-4 py-3 font-mono text-sm text-m3-on-surface border border-m3-outline-variant/40">
                <span className="overflow-x-auto select-all">{getInstallCommand(packageManager)}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(getInstallCommand(packageManager), "cli-cmd")}
                  className="ml-3 flex items-center gap-1 text-xs text-m3-primary font-medium hover:opacity-80 transition-opacity cursor-pointer shrink-0"
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

            {/* Manual Installation & Dependencies */}
            <div className="rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-low p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-m3-on-surface">
                  2. Required Dependencies
                </h2>
                <p className="text-sm text-m3-on-surface-variant">
                  If installing manually, ensure the following core libraries are added to your project:
                </p>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-m3-surface-container-highest px-4 py-3 font-mono text-sm text-m3-on-surface border border-m3-outline-variant/40">
                <span className="overflow-x-auto select-all">
                  {packageManager === "pnpm"
                    ? "pnpm add class-variance-authority radix-ui cn"
                    : packageManager === "npm"
                    ? "npm install class-variance-authority radix-ui cn"
                    : packageManager === "yarn"
                    ? "yarn add class-variance-authority radix-ui cn"
                    : "bun add class-variance-authority radix-ui cn"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      packageManager === "pnpm"
                        ? "pnpm add class-variance-authority radix-ui cn"
                        : "npm install class-variance-authority radix-ui cn",
                      "deps-cmd"
                    )
                  }
                  className="ml-3 flex items-center gap-1 text-xs text-m3-primary font-medium hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                >
                  {copiedKey === "deps-cmd" ? (
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

            {/* Full Component Source Code */}
            <div className="rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-low p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-m3-on-surface">
                    3. Component Source Code
                  </h2>
                  <p className="text-xs font-mono text-m3-on-surface-variant mt-0.5">
                    registry/material-v1/ui/button.tsx
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(rawButtonSource, "raw-source")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-m3-surface-container text-m3-primary hover:bg-m3-surface-container-high transition-colors cursor-pointer"
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

              <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-highest p-4 max-h-[460px] overflow-y-auto">
                <pre className="font-mono text-xs text-m3-on-surface leading-relaxed">
                  <code>{rawButtonSource}</code>
                </pre>
              </div>
            </div>

            {/* Component Props Specification */}
            <div className="rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-low p-6 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-m3-on-surface">
                4. Props Specification
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-m3-on-surface-variant border-collapse">
                  <thead>
                    <tr className="border-b border-m3-outline-variant/50 text-xs font-semibold text-m3-on-surface uppercase tracking-wider">
                      <th className="py-3 px-4">Prop</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Default</th>
                      <th className="py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-m3-outline-variant/30 text-xs sm:text-sm">
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">variant</td>
                      <td className="py-3 px-4 font-mono">&ldquo;filled&rdquo; | &ldquo;tonal&rdquo; | &ldquo;elevated&rdquo; | &ldquo;outlined&rdquo; | &ldquo;text&rdquo;</td>
                      <td className="py-3 px-4 font-mono">&ldquo;filled&rdquo;</td>
                      <td className="py-3 px-4">Visual emphasis tier following Material 3 specification.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">shape</td>
                      <td className="py-3 px-4 font-mono">&ldquo;round&rdquo; | &ldquo;square&rdquo; | &ldquo;circle&rdquo;</td>
                      <td className="py-3 px-4 font-mono">&ldquo;round&rdquo;</td>
                      <td className="py-3 px-4">Corner geometry family. Round applies standard M3 pill radius.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">size</td>
                      <td className="py-3 px-4 font-mono">&ldquo;xs&rdquo; | &ldquo;sm&rdquo; | &ldquo;md&rdquo; | &ldquo;lg&rdquo; | &ldquo;xl&rdquo;</td>
                      <td className="py-3 px-4 font-mono">&ldquo;sm&rdquo;</td>
                      <td className="py-3 px-4">Height, padding, typography, and icon size scale.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">toggle</td>
                      <td className="py-3 px-4 font-mono">&ldquo;none&rdquo; | &ldquo;selected&rdquo; | &ldquo;unselected&rdquo;</td>
                      <td className="py-3 px-4 font-mono">&ldquo;none&rdquo;</td>
                      <td className="py-3 px-4">Toggle state mode for segmented or toggle button patterns.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">leadingIcon</td>
                      <td className="py-3 px-4 font-mono">React.ReactNode</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Element placed prior to button label text with auto spacing.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">trailingIcon</td>
                      <td className="py-3 px-4 font-mono">React.ReactNode</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Element placed after button label text with auto spacing.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">asChild</td>
                      <td className="py-3 px-4 font-mono">boolean</td>
                      <td className="py-3 px-4 font-mono">false</td>
                      <td className="py-3 px-4">Wraps child in Radix Slot, allowing Next.js Link or anchor tags.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-m3-primary font-medium">disabled</td>
                      <td className="py-3 px-4 font-mono">boolean</td>
                      <td className="py-3 px-4 font-mono">false</td>
                      <td className="py-3 px-4">Deactivates click events and sets 38% M3 disabled opacity.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Preset Variant Showcase Gallery */}
      <section className="flex flex-col gap-6 pt-6 border-t border-m3-outline-variant/40">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal text-m3-on-surface">
            Variant Specifications
          </h2>
          <p className="text-sm text-m3-on-surface-variant mt-1">
            Material 3 defines five button variants to support distinct levels of action hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Filled Card */}
          <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-m3-on-surface">Filled Button</span>
              <span className="text-[11px] font-mono uppercase bg-m3-primary-container text-m3-on-primary-container px-2 py-0.5 rounded-full">
                High Emphasis
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant leading-relaxed">
              Use for the single primary, highest-importance action on a page or flow. Only one filled button should dominate a given screen.
            </p>
            <div className="pt-3 border-t border-m3-outline-variant/20 flex items-center justify-center min-h-[72px] bg-m3-surface-container-lowest rounded-lg">
              <Button variant="filled" size="sm">Filled Action</Button>
            </div>
          </div>

          {/* Tonal Card */}
          <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-m3-on-surface">Tonal Button</span>
              <span className="text-[11px] font-mono uppercase bg-m3-secondary-container text-m3-on-secondary-container px-2 py-0.5 rounded-full">
                Medium-High
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant leading-relaxed">
              Provides secondary emphasis alongside filled buttons. Built with secondary container tones to separate from primary flows.
            </p>
            <div className="pt-3 border-t border-m3-outline-variant/20 flex items-center justify-center min-h-[72px] bg-m3-surface-container-lowest rounded-lg">
              <Button variant="tonal" size="sm">Tonal Action</Button>
            </div>
          </div>

          {/* Elevated Card */}
          <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-m3-on-surface">Elevated Button</span>
              <span className="text-[11px] font-mono uppercase bg-m3-surface-container text-m3-on-surface px-2 py-0.5 rounded-full">
                Medium Emphasis
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant leading-relaxed">
              Lightly elevated container for cards and patterned surfaces where an outlined or flat button would lose visual separation.
            </p>
            <div className="pt-3 border-t border-m3-outline-variant/20 flex items-center justify-center min-h-[72px] bg-m3-surface-container-lowest rounded-lg">
              <Button variant="elevated" size="sm">Elevated Action</Button>
            </div>
          </div>

          {/* Outlined Card */}
          <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-m3-on-surface">Outlined Button</span>
              <span className="text-[11px] font-mono uppercase bg-m3-surface-container text-m3-on-surface px-2 py-0.5 rounded-full">
                Medium Emphasis
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant leading-relaxed">
              Essential for secondary or independent actions that need boundary containment without surface fill competition.
            </p>
            <div className="pt-3 border-t border-m3-outline-variant/20 flex items-center justify-center min-h-[72px] bg-m3-surface-container-lowest rounded-lg">
              <Button variant="outlined" size="sm">Outlined Action</Button>
            </div>
          </div>

          {/* Text Card */}
          <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-m3-on-surface">Text Button</span>
              <span className="text-[11px] font-mono uppercase bg-m3-surface-container text-m3-on-surface px-2 py-0.5 rounded-full">
                Low Emphasis
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant leading-relaxed">
              Low-emphasis actions inside dialogs, cards, and toolbars where borders or fills would add unnecessary visual friction.
            </p>
            <div className="pt-3 border-t border-m3-outline-variant/20 flex items-center justify-center min-h-[72px] bg-m3-surface-container-lowest rounded-lg">
              <Button variant="text" size="sm">Text Action</Button>
            </div>
          </div>

          {/* Icon Button Card */}
          <div className="rounded-xl border border-m3-outline-variant/40 bg-m3-surface-container-low p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-m3-on-surface">Circle Shape (Icon)</span>
              <span className="text-[11px] font-mono uppercase bg-m3-surface-container text-m3-on-surface px-2 py-0.5 rounded-full">
                Square Aspect
              </span>
            </div>
            <p className="text-xs text-m3-on-surface-variant leading-relaxed">
              Circle shape enforces aspect ratio equality for standalone icon buttons while preserving the 48px touch target.
            </p>
            <div className="pt-3 border-t border-m3-outline-variant/20 flex items-center justify-center gap-3 min-h-[72px] bg-m3-surface-container-lowest rounded-lg">
              <Button shape="circle" variant="filled" size="sm" aria-label="Search">
                <SearchIcon />
              </Button>
              <Button shape="circle" variant="tonal" size="sm" aria-label="Favorite">
                <FavoriteIcon />
              </Button>
              <Button shape="circle" variant="outlined" size="sm" aria-label="Settings">
                <SettingsIcon />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Size Scale Matrix */}
      <section className="flex flex-col gap-4 pt-6 border-t border-m3-outline-variant/40">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal text-m3-on-surface">
            Size Hierarchy
          </h2>
          <p className="text-sm text-m3-on-surface-variant mt-1">
            Sizes range from xs (compact density) to xl (hero visual impact), maintaining proportional typography and icon bounding.
          </p>
        </div>

        <div className="rounded-2xl border border-m3-outline-variant/50 bg-m3-surface-container-lowest p-6 sm:p-8 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <Button variant="filled" size="xs" leadingIcon={<SearchIcon />}>
            Size XS (32px)
          </Button>
          <Button variant="filled" size="sm" leadingIcon={<SearchIcon />}>
            Size SM (40px)
          </Button>
          <Button variant="filled" size="md" leadingIcon={<SearchIcon />}>
            Size MD (56px)
          </Button>
          <Button variant="filled" size="lg" leadingIcon={<SearchIcon />}>
            Size LG (96px)
          </Button>
        </div>
      </section>
    </main>
  )
}
