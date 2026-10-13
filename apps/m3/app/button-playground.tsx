"use client"

import * as React from "react"
import { flushSync } from "react-dom"
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
import {
  MotionProvider,
  useMotion,
  usePrefersReducedMotion,
} from "@/lib/motion"
import { Field, fieldClass, Segmented, Switch } from "./_playground/controls"
import { CompareMotion, type SlowMotion } from "./_playground/compare-motion"

type Variant = NonNullable<ButtonProps["variant"]>
type Size = NonNullable<ButtonProps["size"]>
type Shape = NonNullable<ButtonProps["shape"]>
type Motion = NonNullable<ButtonProps["motion"]>

const VARIANTS: Variant[] = ["filled", "tonal", "elevated", "outlined", "text"]
const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"]
const SHAPES: Shape[] = ["round", "square"]
const MOTIONS: Motion[] = ["expressive", "standard", "none"]

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

/**
 * Runs a state update inside a view transition, so layout changes the springs
 * can't cover (a new button size, a theme switch) morph instead of jumping.
 */
function useViewTransition() {
  const { scheme } = useMotion()
  return React.useCallback(
    (update: () => void) => {
      if (scheme === "none" || !document.startViewTransition) return update()
      document.startViewTransition(() => flushSync(update))
    },
    [scheme]
  )
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

export function ButtonPlayground() {
  const osReducedMotion = usePrefersReducedMotion()
  const [previewMotion, setPreviewMotion] = React.useState(false)
  return (
    <MotionProvider reducedMotion={previewMotion ? "never" : "user"}>
      <Playground
        osReducedMotion={osReducedMotion}
        previewMotion={previewMotion}
        onPreviewMotion={setPreviewMotion}
      />
    </MotionProvider>
  )
}

function Playground({
  osReducedMotion,
  previewMotion,
  onPreviewMotion,
}: {
  osReducedMotion: boolean
  previewMotion: boolean
  onPreviewMotion: (value: boolean) => void
}) {
  const [variant, setVariant] = React.useState<Variant>("filled")
  const [size, setSize] = React.useState<Size>("sm")
  const [shape, setShape] = React.useState<Shape>("round")
  const [motion, setMotion] = React.useState<Motion>("expressive")
  const [slowMotion, setSlowMotion] = React.useState<SlowMotion>("1x")
  const [isToggle, setIsToggle] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [leading, setLeading] = React.useState<IconKey>("none")
  const [trailing, setTrailing] = React.useState<IconKey>("none")
  const [label, setLabel] = React.useState("Label")
  const withTransition = useViewTransition()
  const dark = React.useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )

  const canToggle = variant !== "text"
  const toggleActive = isToggle && canToggle
  const durationScale = parseInt(slowMotion)
  const leadingIcon = ICONS[leading]
  const trailingIcon = ICONS[trailing]

  const props = [
    variant !== "filled" && `  variant="${variant}"`,
    size !== "sm" && `  size="${size}"`,
    shape !== "round" && `  shape="${shape}"`,
    motion !== "expressive" && `  motion="${motion}"`,
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
    <main className="mx-auto grid w-full max-w-7xl flex-1 items-start gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_340px] lg:p-8">
      {/* Fixed heights: nothing on the page moves when the button or its code changes */}
      <section className="min-w-0 overflow-hidden rounded-[28px] bg-m3-surface-container-low">
        <div className="flex items-center justify-between px-6 pt-5 text-sm text-m3-on-surface-variant">
          <span className="font-medium">Button</span>
          <span className="font-mono text-xs">
            {variant} · {size} · {shape} · {motion}
            {toggleActive && ` · ${selected ? "selected" : "unselected"}`}
          </span>
        </div>
        <div className="flex h-80 items-center justify-center p-8">
          <MotionProvider durationScale={durationScale}>
            <Button
              style={{ viewTransitionName: "stage-button" }}
              variant={variant}
              size={size}
              shape={shape}
              motion={motion}
              selected={toggleActive ? selected : undefined}
              disabled={disabled}
              leadingIcon={leadingIcon?.node}
              trailingIcon={trailingIcon?.node}
              onClick={toggleActive ? () => setSelected((s) => !s) : undefined}
            >
              {label}
            </Button>
          </MotionProvider>
        </div>
        <pre className="h-56 overflow-auto border-t border-m3-outline-variant/50 bg-m3-surface-container px-6 py-4 font-mono text-xs/5 text-m3-on-surface-variant">
          <code>{code}</code>
        </pre>
      </section>

      <aside className="flex flex-col gap-6 rounded-[28px] bg-m3-surface-container-low p-6 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <Segmented
          label="Variant"
          options={VARIANTS}
          value={variant}
          onChange={setVariant}
        />
        <Segmented
          label="Size"
          options={SIZES}
          value={size}
          onChange={(s) => withTransition(() => setSize(s))}
        />
        <Segmented
          label="Shape"
          options={SHAPES}
          value={shape}
          onChange={setShape}
        />
        <Segmented
          label="Motion"
          options={MOTIONS}
          value={motion}
          onChange={setMotion}
        />

        <Field label="Label">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className={fieldClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["Leading icon", leading, setLeading],
              ["Trailing icon", trailing, setTrailing],
            ] as const
          ).map(([text, value, set]) => (
            <Field key={text} label={text}>
              <select
                value={value}
                onChange={(e) =>
                  withTransition(() => set(e.target.value as IconKey))
                }
                className={fieldClass}
              >
                {Object.keys(ICONS).map((key) => (
                  <option
                    key={key}
                    value={key}
                    className="bg-m3-surface-container"
                  >
                    {key}
                  </option>
                ))}
              </select>
            </Field>
          ))}
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
            onChange={(next) =>
              withTransition(() =>
                document.documentElement.classList.toggle("dark", next)
              )
            }
          />
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-1">
        <MotionProvider durationScale={durationScale}>
          <CompareMotion
            variant={variant}
            highlight={motion}
            slowMotion={slowMotion}
            onSlowMotion={setSlowMotion}
            osReducedMotion={osReducedMotion}
            previewMotion={previewMotion}
            onPreviewMotion={onPreviewMotion}
          />
        </MotionProvider>
      </div>
    </main>
  )
}
