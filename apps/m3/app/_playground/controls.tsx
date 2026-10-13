"use client"

import * as React from "react"
import { Spring, springs, springToCSS, useMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** CSS transition strings for the M3 springs, for elements CSS can animate alone. */
export function useSpringTransition(properties: string[]) {
  const { scheme, durationScale } = useMotion()
  const key = properties.join()
  return React.useMemo(() => {
    if (scheme === "none") return "none"
    const spatial = springToCSS(springs[scheme].fastSpatial)
    const effects = springToCSS(springs[scheme].defaultEffects)
    return properties
      .map((p) => {
        const isSpatial = ["transform", "translate", "scale"].includes(p)
        const { easing, duration } = isSpatial ? spatial : effects
        return `${p} ${duration * durationScale}ms ${easing}`
      })
      .join(", ")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme, durationScale, key])
}

/**
 * Calls `place(false)` (snap, no animation) when the element resizes.
 * Subscribes once: a new ResizeObserver fires immediately, which would cut
 * short any spring started by the same render.
 */
export function useSnapOnResize(
  ref: React.RefObject<HTMLElement | null>,
  place: (animate: boolean) => void
) {
  const latest = React.useRef(place)
  React.useLayoutEffect(() => {
    latest.current = place
  })
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let width = el.clientWidth
    const observer = new ResizeObserver(() => {
      if (el.clientWidth === width) return
      width = el.clientWidth
      latest.current(false)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

/** Radio group with a selection pill that springs between options. */
export function Segmented<T extends string>({
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
  const motion = useMotion()
  const track = React.useRef<HTMLDivElement>(null)
  const pill = React.useRef<HTMLSpanElement>(null)
  const spring = React.useRef<Spring<number[]> | null>(null)
  const colorTransition = useSpringTransition(["color"])

  const place = React.useCallback(
    (animate: boolean) => {
      const option = track.current?.querySelector<HTMLElement>(
        `[data-option="${CSS.escape(value)}"]`
      )
      const el = pill.current
      if (!option || !el) return
      const target = [
        option.offsetLeft,
        option.offsetTop,
        option.offsetWidth,
        option.offsetHeight,
      ]
      if (!spring.current) {
        spring.current = new Spring(target, ([x, y, w, h]) => {
          el.style.transform = `translate(${x}px, ${y}px)`
          el.style.width = `${w}px`
          el.style.height = `${h}px`
        })
        spring.current.set(target)
      } else if (!animate || motion.scheme === "none") {
        spring.current.set(target)
      } else {
        spring.current.to(
          target,
          springs[motion.scheme].fastSpatial,
          motion.durationScale
        )
      }
    },
    [value, motion.scheme, motion.durationScale]
  )

  React.useLayoutEffect(() => place(true), [place])

  useSnapOnResize(track, place)

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium text-m3-on-surface-variant">
        {label}
      </legend>
      <div
        ref={track}
        className="relative isolate flex flex-wrap gap-1 rounded-[20px] bg-m3-surface-container-high p-1"
      >
        <span
          ref={pill}
          aria-hidden
          className="absolute top-0 left-0 -z-10 rounded-full bg-m3-secondary-container"
        />
        {options.map((option) => (
          <label
            key={option}
            data-option={option}
            style={{ transition: colorTransition }}
            className={cn(
              "relative flex-1 cursor-pointer rounded-full px-3 py-1.5 text-center text-sm font-medium select-none",
              "has-focus-visible:outline-2 has-focus-visible:outline-m3-secondary",
              "before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-15 hover:before:opacity-8",
              value === option
                ? "text-m3-on-secondary-container"
                : "text-m3-on-surface-variant"
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

/** M3-style switch: the handle grows and slides on the fast spatial spring. */
export function Switch({
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
  const handle = useSpringTransition(["translate", "scale", "background-color"])
  const track = useSpringTransition(["background-color", "border-color"])
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 text-sm text-m3-on-surface",
        disabled && "cursor-default text-m3-on-surface/38"
      )}
    >
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        style={{ transition: track }}
        className={cn(
          "group relative h-8 w-13 shrink-0 cursor-[inherit] rounded-full border-2",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-secondary",
          checked
            ? "border-m3-primary bg-m3-primary"
            : "border-m3-outline bg-m3-surface-container-highest",
          disabled && "opacity-38"
        )}
      >
        <span
          aria-hidden
          style={{ transition: handle }}
          className={cn(
            "absolute top-1/2 left-0 size-6 -translate-y-1/2 rounded-full",
            checked
              ? "translate-x-5 scale-100 bg-m3-on-primary group-active:scale-[1.17]"
              : "translate-x-0.5 scale-[0.667] bg-m3-outline group-active:scale-[1.17]"
          )}
        />
      </button>
    </label>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-m3-on-surface-variant">
      {label}
      {children}
    </label>
  )
}

export const fieldClass =
  "h-10 rounded-lg border border-m3-outline bg-transparent px-3 text-sm text-m3-on-surface transition-[border-color] duration-150 hover:border-m3-on-surface focus-visible:outline-2 focus-visible:outline-m3-primary"
