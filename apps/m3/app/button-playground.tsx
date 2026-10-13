"use client"

import * as React from "react"
import Button, { type ButtonProps } from "@/registry/material-v1/ui/button"
import {
  AddIcon,
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  FavoriteIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "@/registry/material-v1/ui/icons"
import { cn } from "@/lib/utils"

type Variant = NonNullable<ButtonProps["variant"]>
type Size = NonNullable<ButtonProps["size"]>
type Shape = NonNullable<ButtonProps["shape"]>

const VARIANTS: Variant[] = ["filled", "tonal", "elevated", "outlined", "text"]
const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"]
const SHAPES: Shape[] = ["round", "square"]

const ICONS = {
  none: null,
  add: { node: <AddIcon />, name: "AddIcon" },
  search: { node: <SearchIcon />, name: "SearchIcon" },
  favorite: { node: <FavoriteIcon />, name: "FavoriteIcon" },
  check: { node: <CheckIcon />, name: "CheckIcon" },
  arrow: { node: <ArrowRightIcon />, name: "ArrowRightIcon" },
  download: { node: <DownloadIcon />, name: "DownloadIcon" },
} as const
type IconKey = keyof typeof ICONS

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium text-m3-on-surface-variant">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1 rounded-full bg-m3-surface-container-high p-1">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex-1 cursor-pointer rounded-full px-3 py-1.5 text-center text-sm font-medium transition-colors",
              "has-focus-visible:outline-2 has-focus-visible:outline-m3-secondary",
              value === option
                ? "bg-m3-secondary-container text-m3-on-secondary-container"
                : "text-m3-on-surface-variant hover:bg-m3-on-surface/8"
            )}
          >
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function Switch({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 text-sm",
        disabled && "cursor-default opacity-38"
      )}
    >
      {label}
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 cursor-[inherit] appearance-none rounded-full border-2 transition-colors",
          "border-m3-outline bg-m3-surface-container-highest checked:border-m3-primary checked:bg-m3-primary",
          "before:absolute before:top-1/2 before:left-1 before:size-3 before:-translate-y-1/2 before:rounded-full before:bg-m3-outline before:transition-all",
          "checked:before:left-5.5 checked:before:size-4 checked:before:bg-m3-on-primary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary"
        )}
      />
    </label>
  )
}

function IconSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: IconKey
  onChange: (value: IconKey) => void
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-m3-on-surface-variant">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IconKey)}
        className="h-10 rounded-lg border border-m3-outline bg-transparent px-3 text-sm text-m3-on-surface focus-visible:outline-2 focus-visible:outline-m3-primary"
      >
        {Object.keys(ICONS).map((key) => (
          <option key={key} value={key} className="bg-m3-surface-container">
            {key}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ButtonPlayground() {
  const [variant, setVariant] = React.useState<Variant>("filled")
  const [size, setSize] = React.useState<Size>("sm")
  const [shape, setShape] = React.useState<Shape>("round")
  const [isToggle, setIsToggle] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [leading, setLeading] = React.useState<IconKey>("none")
  const [trailing, setTrailing] = React.useState<IconKey>("none")
  const [label, setLabel] = React.useState("Label")
  const dark = React.useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
      return () => observer.disconnect()
    },
    () => document.documentElement.classList.contains("dark"),
    () => false
  )

  const toggleTheme = (next: boolean) => {
    document.documentElement.classList.toggle("dark", next)
  }

  const canToggle = variant !== "text"
  const toggleActive = isToggle && canToggle
  const leadingIcon = ICONS[leading]
  const trailingIcon = ICONS[trailing]

  const props = [
    variant !== "filled" && `  variant="${variant}"`,
    size !== "sm" && `  size="${size}"`,
    shape !== "round" && `  shape="${shape}"`,
    toggleActive && `  selected={${selected}}`,
    toggleActive && "  onClick={() => setSelected((s) => !s)}",
    disabled && "  disabled",
    leadingIcon && `  leadingIcon={<${leadingIcon.name} />}`,
    trailingIcon && `  trailingIcon={<${trailingIcon.name} />}`,
  ].filter(Boolean)
  const code = props.length
    ? `<Button\n${props.join("\n")}\n>\n  ${label}\n</Button>`
    : `<Button>${label}</Button>`

  return (
    <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_340px] lg:p-8">
      {/* Stage */}
      <section className="flex min-h-[60vh] flex-col overflow-hidden rounded-[28px] bg-m3-surface-container-low">
        <div className="flex items-center justify-between px-6 pt-5 text-sm text-m3-on-surface-variant">
          <span className="font-medium">Button</span>
          <span className="font-mono text-xs">
            {variant} · {size} · {shape}
            {toggleActive && ` · ${selected ? "selected" : "unselected"}`}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center p-8">
          <Button
            variant={variant}
            size={size}
            shape={shape}
            selected={toggleActive ? selected : undefined}
            disabled={disabled}
            leadingIcon={leadingIcon?.node}
            trailingIcon={trailingIcon?.node}
            onClick={toggleActive ? () => setSelected((s) => !s) : undefined}
          >
            {label}
          </Button>
        </div>
        <pre className="overflow-x-auto border-t border-m3-outline-variant/50 bg-m3-surface-container px-6 py-4 font-mono text-xs/5 text-m3-on-surface-variant">
          <code>{code}</code>
        </pre>
      </section>

      {/* Controls */}
      <aside className="flex flex-col gap-6 rounded-[28px] bg-m3-surface-container-low p-6">
        <Segmented
          label="Variant"
          options={VARIANTS}
          value={variant}
          onChange={setVariant}
        />
        <Segmented label="Size" options={SIZES} value={size} onChange={setSize} />
        <Segmented
          label="Shape"
          options={SHAPES}
          value={shape}
          onChange={setShape}
        />

        <label className="flex flex-col gap-2 text-sm font-medium text-m3-on-surface-variant">
          Label
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="h-10 rounded-lg border border-m3-outline bg-transparent px-3 text-sm text-m3-on-surface focus-visible:outline-2 focus-visible:outline-m3-primary"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <IconSelect label="Leading icon" value={leading} onChange={setLeading} />
          <IconSelect
            label="Trailing icon"
            value={trailing}
            onChange={setTrailing}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-m3-outline-variant/50 pt-6">
          <Switch
            label={canToggle ? "Toggle button" : "Toggle button (not for text)"}
            checked={toggleActive}
            onChange={setIsToggle}
            disabled={!canToggle}
          />
          <Switch
            label="Selected"
            checked={selected}
            onChange={setSelected}
            disabled={!toggleActive}
          />
          <Switch label="Disabled" checked={disabled} onChange={setDisabled} />
          <Switch
            label={
              <span className="inline-flex items-center gap-2">
                {dark ? <MoonIcon /> : <SunIcon />} Dark theme
              </span>
            }
            checked={dark}
            onChange={toggleTheme}
          />
        </div>
      </aside>
    </main>
  )
}
