"use client";

import * as React from "react";
import Button from "@/registry/material-v1/ui/button";

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-primary">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

type VariantKey = "filled" | "elevated" | "tonal" | "outlined" | "text";
type SizeKey = "xs" | "sm" | "md" | "lg" | "xl";
type ShapeKey = "round" | "square";

export default function ButtonDocsPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<VariantKey>("filled");
  const [selectedSize, setSelectedSize] = React.useState<SizeKey>("md");
  const [selectedShape, setSelectedShape] = React.useState<ShapeKey>("round");
  const [hasIcon, setHasIcon] = React.useState(true);
  const [isToggle, setIsToggle] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const [useMorphWidth, setUseMorphWidth] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const [copiedInstall, setCopiedInstall] = React.useState(false);
  const [copiedUsage, setCopiedUsage] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [packageManager, setPackageManager] = React.useState<"pnpm" | "npm" | "bun">("pnpm");

  const installCommands = {
    pnpm: "pnpm dlx @m3/ui add button",
    npm: "npx @m3/ui add button",
    bun: "bunx @m3/ui add button",
  };

  const usageSnippet = `import Button from "@/registry/material-v1/ui/button";

export function Demo() {
  return (
    <Button
      variant="${selectedVariant}"
      size="${selectedSize}"
      shape="${selectedShape}"${isToggle ? `\n      selected={${isSelected}}` : ""}${useMorphWidth ? `\n      morphWidth` : ""}${isDisabled ? `\n      disabled` : ""}
    >
      ${isToggle ? (isSelected ? "Selected Button" : "Unselected Button") : "Button Action"}
    </Button>
  );
}`;

  const buttonSourceCode = `import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "font-medium whitespace-nowrap outline-none cursor-pointer transform-gpu",
    "transition-[border-radius,width,transform,box-shadow,background-color,color,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:duration-300 active:scale-[0.98]",
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
        text: "",
      },
      shape: {
        round: "",
        square: "",
        circle: "aspect-square p-0 min-w-0",
      },
      size: {
        xs: "h-8 px-3 gap-1 text-xs active:rounded-[8px] [&_svg]:size-5",
        sm: "h-10 px-4 gap-2 text-sm active:rounded-[8px] [&_svg]:size-5",
        md: "h-14 px-6 gap-2 text-base active:rounded-[12px] [&_svg]:size-6",
        lg: "h-24 px-12 gap-3 text-2xl active:rounded-[16px] [&_svg]:size-8",
        xl: "h-[136px] px-16 gap-4 text-4xl active:rounded-[16px] [&_svg]:size-10",
      },
      toggle: {
        none: "",
        selected: "",
        unselected: "",
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
      { variant: "elevated", toggle: "none", className: "bg-surface-container-low text-primary shadow-xs hover:shadow-md active:shadow-xs" },
      { variant: "elevated", toggle: "unselected", className: "bg-surface-container-low text-primary border border-outline-variant shadow-none" },
      { variant: "elevated", toggle: "selected", className: "bg-primary text-on-primary shadow-xs hover:shadow-md active:shadow-xs" },
      { variant: "filled", toggle: "none", className: "bg-primary text-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "filled", toggle: "unselected", className: "bg-surface-container text-on-surface hover:bg-surface-container-high" },
      { variant: "filled", toggle: "selected", className: "bg-primary text-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "tonal", toggle: "none", className: "bg-secondary-container text-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "tonal", toggle: "unselected", className: "bg-surface-container-low text-on-surface-variant hover:bg-surface-container" },
      { variant: "tonal", toggle: "selected", className: "bg-secondary-container text-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "outlined", toggle: "none", className: "bg-transparent text-primary border border-outline hover:bg-primary/8 active:bg-primary/12" },
      { variant: "outlined", toggle: "unselected", className: "bg-transparent text-on-surface border border-outline hover:bg-on-surface/8 active:bg-on-surface/12" },
      { variant: "outlined", toggle: "selected", className: "bg-inverse-surface text-inverse-on-surface border border-transparent hover:opacity-95 active:opacity-90" },
      { variant: "text", className: "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12" },
    ],
    defaultVariants: {
      variant: "filled",
      shape: "round",
      size: "sm",
      toggle: "none",
    },
  }
);`;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col gap-12">
      {/* Title & Metadata */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Components / Actions
          </span>
          <span className="text-on-surface-variant/40">•</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-medium">
            M3 Ready
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-on-surface">
          Button
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Material 3 common buttons prompt actions and express what will happen next. Supports 5 visual variants, 5 proportional sizes, 2 geometric shapes, toggle selection, and real physical press morphing.
        </p>
      </div>

      {/* 1. Live Interactive Preview Pane per DESIGN.md */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-on-surface">
            Interactive Playground
          </h2>
          <span className="text-xs text-on-surface-variant">
            Click, toggle, or press-and-hold to feel the spring physics
          </span>
        </div>

        <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-low overflow-hidden shadow-xs">
          {/* Controls Bar */}
          <div className="p-4 border-b border-outline-variant/30 bg-surface-container flex flex-wrap items-center gap-4 text-xs font-medium">
            {/* Variant selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-on-surface-variant">Variant:</span>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value as VariantKey)}
                className="bg-surface-container-highest text-on-surface px-2.5 py-1 rounded-lg border border-outline-variant/40 outline-none text-xs"
              >
                <option value="filled">Filled (Primary)</option>
                <option value="elevated">Elevated</option>
                <option value="tonal">Tonal</option>
                <option value="outlined">Outlined</option>
                <option value="text">Text</option>
              </select>
            </div>

            {/* Size selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-on-surface-variant">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as SizeKey)}
                className="bg-surface-container-highest text-on-surface px-2.5 py-1 rounded-lg border border-outline-variant/40 outline-none text-xs"
              >
                <option value="xs">XS (32dp)</option>
                <option value="sm">SM (40dp)</option>
                <option value="md">MD (56dp)</option>
                <option value="lg">LG (96dp)</option>
                <option value="xl">XL (136dp)</option>
              </select>
            </div>

            {/* Shape selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-on-surface-variant">Shape:</span>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value as ShapeKey)}
                className="bg-surface-container-highest text-on-surface px-2.5 py-1 rounded-lg border border-outline-variant/40 outline-none text-xs"
              >
                <option value="round">Round (Pill)</option>
                <option value="square">Square (Curved)</option>
              </select>
            </div>

            {/* Toggle checkboxes */}
            <label className="flex items-center gap-1.5 cursor-pointer text-on-surface-variant select-none">
              <input
                type="checkbox"
                checked={hasIcon}
                onChange={(e) => setHasIcon(e.target.checked)}
                className="accent-primary"
              />
              <span>Leading Icon</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-on-surface-variant select-none">
              <input
                type="checkbox"
                checked={isToggle}
                onChange={(e) => setIsToggle(e.target.checked)}
                className="accent-primary"
              />
              <span>Toggle Mode</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-on-surface-variant select-none">
              <input
                type="checkbox"
                checked={useMorphWidth}
                onChange={(e) => setUseMorphWidth(e.target.checked)}
                className="accent-primary"
              />
              <span>morphWidth</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-on-surface-variant select-none">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="accent-primary"
              />
              <span>Disabled</span>
            </label>
          </div>

          {/* Canvas Pane (preview-pane) */}
          <div className="min-h-[220px] p-8 sm:p-12 bg-surface-container-lowest flex items-center justify-center overflow-x-auto">
            <Button
              variant={selectedVariant}
              size={selectedSize}
              shape={selectedShape}
              selected={isToggle ? isSelected : undefined}
              morphWidth={useMorphWidth}
              disabled={isDisabled}
              leadingIcon={hasIcon ? <PlusIcon /> : undefined}
              onClick={() => {
                if (isToggle) setIsSelected((prev) => !prev);
              }}
            >
              {isToggle
                ? isSelected
                  ? "Selected Active"
                  : "Unselected Option"
                : "Action Button"}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Install Command Hero */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium text-on-surface">Installation</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {(["pnpm", "npm", "bun"] as const).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setPackageManager(pm)}
                className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                  packageManager === pm
                    ? "bg-secondary-container text-on-secondary-container font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between w-full p-4 rounded-xl bg-surface-container-highest font-mono text-sm border border-outline-variant/40">
            <code>{installCommands[packageManager]}</code>
            <Button
              shape="circle"
              size="xs"
              variant="text"
              onClick={() => {
                navigator.clipboard.writeText(installCommands[packageManager]);
                setCopiedInstall(true);
                setTimeout(() => setCopiedInstall(false), 2000);
              }}
              aria-label="Copy install command"
            >
              {copiedInstall ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Usage Example */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium text-on-surface">Usage</h2>
        <div className="relative rounded-xl bg-surface-container-highest p-4 border border-outline-variant/40">
          <div className="absolute top-3 right-3">
            <Button
              shape="circle"
              size="xs"
              variant="text"
              onClick={() => {
                navigator.clipboard.writeText(usageSnippet);
                setCopiedUsage(true);
                setTimeout(() => setCopiedUsage(false), 2000);
              }}
              aria-label="Copy usage code"
            >
              {copiedUsage ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </div>
          <pre className="font-mono text-xs sm:text-sm text-on-surface overflow-x-auto leading-relaxed">
            <code>{usageSnippet}</code>
          </pre>
        </div>
      </section>

      {/* 4. Complete Source Code */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-on-surface">Component Source Code</h2>
            <p className="text-xs text-on-surface-variant">
              Paste directly into <code className="font-mono text-primary">registry/material-v1/ui/button.tsx</code>
            </p>
          </div>
          <Button
            size="xs"
            variant="tonal"
            onClick={() => {
              navigator.clipboard.writeText(buttonSourceCode);
              setCopiedCode(true);
              setTimeout(() => setCopiedCode(false), 2000);
            }}
          >
            {copiedCode ? "Copied!" : "Copy Source"}
          </Button>
        </div>

        <div className="relative rounded-xl bg-surface-container-highest p-4 border border-outline-variant/40 max-h-[400px] overflow-y-auto">
          <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed">
            <code>{buttonSourceCode}</code>
          </pre>
        </div>
      </section>

      {/* 5. Props & API Reference Table per DESIGN.md */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-on-surface">Props & API Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-outline-variant/40 bg-surface">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container text-on-surface text-xs font-semibold border-b border-outline-variant/40">
                <th className="py-3 px-4">Prop</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Default</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">variant</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">&quot;filled&quot; | &quot;elevated&quot; | &quot;tonal&quot; | &quot;outlined&quot; | &quot;text&quot;</td>
                <td className="py-3 px-4 font-mono text-xs">&quot;filled&quot;</td>
                <td className="py-3 px-4 text-on-surface-variant">The Material 3 elevation and color container treatment.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">size</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">&quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot;</td>
                <td className="py-3 px-4 font-mono text-xs">&quot;sm&quot;</td>
                <td className="py-3 px-4 text-on-surface-variant">Height (32dp to 136dp) and proportional padding/typography.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">shape</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">&quot;round&quot; | &quot;square&quot; | &quot;circle&quot;</td>
                <td className="py-3 px-4 font-mono text-xs">&quot;round&quot;</td>
                <td className="py-3 px-4 text-on-surface-variant">Round (Family A pill), Square (Family B curved), or Circle (icon button).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">selected</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">boolean | undefined</td>
                <td className="py-3 px-4 font-mono text-xs">undefined</td>
                <td className="py-3 px-4 text-on-surface-variant">Activates toggle mode with aria-pressed and M3 active container colors.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">morphWidth</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">boolean</td>
                <td className="py-3 px-4 font-mono text-xs">false</td>
                <td className="py-3 px-4 text-on-surface-variant">Animates width smoothly across text changes so siblings glide with inertia.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">leadingIcon</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">React.ReactNode</td>
                <td className="py-3 px-4 font-mono text-xs">undefined</td>
                <td className="py-3 px-4 text-on-surface-variant">Leading icon slot (auto-scales 20dp–40dp with size).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">trailingIcon</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">React.ReactNode</td>
                <td className="py-3 px-4 font-mono text-xs">undefined</td>
                <td className="py-3 px-4 text-on-surface-variant">Trailing icon slot.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-primary">asChild</td>
                <td className="py-3 px-4 font-mono text-xs text-on-surface-variant">boolean</td>
                <td className="py-3 px-4 font-mono text-xs">false</td>
                <td className="py-3 px-4 text-on-surface-variant">Radix UI Slot polymorphism to render custom elements (e.g. Next.js Link).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Accessibility & Motion Guarantee per DESIGN.md */}
      <section className="flex flex-col gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <h2 className="text-lg font-medium text-on-surface">Accessibility & Motion Contract</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-on-surface-variant">
          <li className="flex flex-col gap-1">
            <strong className="text-on-surface font-semibold">48 × 48 px Minimum Touch Target</strong>
            <span>Guaranteed across all visual sizes (even 32dp xs) via absolute pseudo-element expansion (<code className="font-mono text-primary text-xs">after:min-h-[48px]</code>).</span>
          </li>
          <li className="flex flex-col gap-1">
            <strong className="text-on-surface font-semibold">W3C WAI-ARIA Toggle Conformance</strong>
            <span>Sets <code className="font-mono text-primary text-xs">aria-pressed=&quot;true | false&quot;</code> and <code className="font-mono text-primary text-xs">data-state</code> automatically when <code className="font-mono text-primary text-xs">selected</code> is supplied.</span>
          </li>
          <li className="flex flex-col gap-1">
            <strong className="text-on-surface font-semibold">High-Contrast Focus Indicator</strong>
            <span>2px offset focus ring (<code className="font-mono text-primary text-xs">focus-visible:ring-2 focus-visible:ring-primary</code>) visible during keyboard navigation.</span>
          </li>
          <li className="flex flex-col gap-1">
            <strong className="text-on-surface font-semibold">M3 Physics & Corner Morphing</strong>
            <span>Active press scales down by 2% and pulls corners inward to Family C compact radii (<code className="font-mono text-primary text-xs">8dp / 12dp / 16dp</code>) with spring easing.</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
