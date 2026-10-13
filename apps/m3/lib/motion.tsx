"use client"

import * as React from "react"

/**
 * M3 motion: spring tokens, a dependency-free spring, and a provider to pick
 * the motion scheme app-wide.
 * Spec: https://m3.material.io/styles/motion/overview/how-it-works
 */

export type MotionScheme = "expressive" | "standard"
/** "none" snaps to the end state. Reduced-motion users always get "none". */
export type MotionPreference = MotionScheme | "none"

export interface SpringConfig {
  /** 1 = no overshoot, lower = more bounce. */
  dampingRatio: number
  /** Higher = faster. */
  stiffness: number
}

export type SpringToken =
  | "fastSpatial"
  | "defaultSpatial"
  | "slowSpatial"
  | "fastEffects"
  | "defaultEffects"
  | "slowEffects"

/** Spatial springs move things (and may overshoot); effects springs fade colour and opacity. */
export const springs: Record<
  MotionScheme,
  Record<SpringToken, SpringConfig>
> = {
  expressive: {
    fastSpatial: { dampingRatio: 0.6, stiffness: 800 },
    defaultSpatial: { dampingRatio: 0.8, stiffness: 380 },
    slowSpatial: { dampingRatio: 0.8, stiffness: 200 },
    fastEffects: { dampingRatio: 1, stiffness: 3800 },
    defaultEffects: { dampingRatio: 1, stiffness: 1600 },
    slowEffects: { dampingRatio: 1, stiffness: 800 },
  },
  standard: {
    fastSpatial: { dampingRatio: 0.9, stiffness: 1400 },
    defaultSpatial: { dampingRatio: 0.9, stiffness: 700 },
    slowSpatial: { dampingRatio: 0.9, stiffness: 300 },
    fastEffects: { dampingRatio: 1, stiffness: 3800 },
    defaultEffects: { dampingRatio: 1, stiffness: 1600 },
    slowEffects: { dampingRatio: 1, stiffness: 800 },
  },
}

/**
 * Exact position and velocity of a damped spring (mass 1) after `t` seconds,
 * starting `displacement` from its target. Closed form, so it is accurate at
 * any frame rate (stepping it numerically loses about 13% of the overshoot).
 */
export function solveSpring(
  { stiffness, dampingRatio: z }: SpringConfig,
  displacement: number,
  velocity: number,
  t: number
): [position: number, velocity: number] {
  const w = Math.sqrt(stiffness)
  const d = displacement
  const v = velocity

  if (Math.abs(z - 1) < 1e-6) {
    const e = Math.exp(-w * t)
    return [e * (d + (v + w * d) * t), e * (v - w * t * (v + w * d))]
  }
  if (z < 1) {
    const wd = w * Math.sqrt(1 - z * z)
    const e = Math.exp(-z * w * t)
    const cos = Math.cos(wd * t)
    const sin = Math.sin(wd * t)
    return [
      e * (d * cos + ((v + z * w * d) / wd) * sin),
      e * (v * cos - ((w * w * d + z * w * v) / wd) * sin),
    ]
  }
  const r1 = -z * w + w * Math.sqrt(z * z - 1)
  const r2 = -z * w - w * Math.sqrt(z * z - 1)
  const c2 = (r1 * d - v) / (r1 - r2)
  const c1 = d - c2
  const e1 = Math.exp(r1 * t)
  const e2 = Math.exp(r2 * t)
  return [c1 * e1 + c2 * e2, r1 * c1 * e1 + r2 * c2 * e2]
}

type SpringValue = number | number[]

/**
 * A damped spring (mass 1) driven by requestAnimationFrame. Springs a number,
 * or an array of numbers that move together (e.g. the channels of a colour).
 * Retargeting mid-flight keeps the current velocity, so interrupted motion
 * carries its momentum instead of restarting.
 */
export class Spring<T extends SpringValue = number> {
  private readonly scalar: boolean
  private x: number[]
  private v: number[]
  private goal: number[]
  private config: SpringConfig = springs.expressive.fastSpatial
  private durationScale = 1
  private frame = 0
  private last = 0

  /** `precision` is the distance from the target that counts as settled. */
  constructor(
    value: T,
    private onUpdate: (value: T) => void,
    private onRest?: (value: T) => void,
    private precision = 0.01
  ) {
    this.scalar = !Array.isArray(value)
    this.x = toArray(value)
    this.goal = [...this.x]
    this.v = this.x.map(() => 0)
  }

  get value(): T {
    return this.unwrap(this.x)
  }

  get target(): T {
    return this.unwrap(this.goal)
  }

  get isAnimating() {
    return this.frame !== 0
  }

  /** `durationScale` > 1 slows the spring down (5 = five times slower) without changing its shape. */
  to(target: T, config: SpringConfig, durationScale = 1) {
    this.goal = toArray(target)
    this.config = config
    this.durationScale = durationScale
    if (!this.frame) {
      // Paint the start value now, so a CSS change made in the same render can't flash first
      this.onUpdate(this.value)
      this.last = performance.now()
      this.frame = requestAnimationFrame(this.tick)
    }
  }

  /** Move to a value instantly, dropping any velocity. */
  set(value: T) {
    this.stop()
    this.x = toArray(value)
    this.goal = [...this.x]
    this.v = this.x.map(() => 0)
    this.onUpdate(this.value)
    this.onRest?.(this.value)
  }

  stop() {
    cancelAnimationFrame(this.frame)
    this.frame = 0
  }

  private unwrap(values: number[]): T {
    return (this.scalar ? values[0] : [...values]) as T
  }

  private tick = (now: number) => {
    const elapsed = (now - this.last) / 1000 / this.durationScale
    this.last = now
    let settled = true
    for (let i = 0; i < this.x.length; i++) {
      const [offset, velocity] = solveSpring(
        this.config,
        this.x[i] - this.goal[i],
        this.v[i],
        elapsed
      )
      this.x[i] = this.goal[i] + offset
      this.v[i] = velocity
      if (
        Math.abs(offset) >= this.precision ||
        Math.abs(velocity) >= this.precision * 10
      ) {
        settled = false
      }
    }

    if (settled) {
      this.frame = 0
      this.set(this.target)
      return
    }

    this.onUpdate(this.value)
    this.frame = requestAnimationFrame(this.tick)
  }
}

function toArray(value: SpringValue) {
  return Array.isArray(value) ? [...value] : [value]
}

export interface MotionSettings {
  scheme: MotionPreference
  durationScale: number
}

/** "user" follows the OS setting; "always" forces reduced motion; "never" ignores it (previews only). */
export type ReducedMotion = "user" | "always" | "never"

const MotionContext = React.createContext<
  MotionSettings & { reducedMotion: ReducedMotion }
>({
  scheme: "expressive",
  durationScale: 1,
  reducedMotion: "user",
})

/**
 * Sets the motion for every M3 component below it.
 * `durationScale` slows every spring down for debugging, like Android's
 * "Animator duration scale" developer option. Leave it at 1 in production.
 * `reducedMotion` defaults to "user". Only set "never" for motion previews
 * the viewer explicitly asked for.
 */
export function MotionProvider({
  scheme = "expressive",
  durationScale = 1,
  reducedMotion = "user",
  children,
}: {
  scheme?: MotionPreference
  durationScale?: number
  reducedMotion?: ReducedMotion
  children: React.ReactNode
}) {
  const value = React.useMemo(
    () => ({ scheme, durationScale, reducedMotion }),
    [scheme, durationScale, reducedMotion]
  )
  return <MotionContext value={value}>{children}</MotionContext>
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/**
 * The motion to animate with. Scheme: the prop override, then the provider,
 * then "none" if the user prefers reduced motion.
 */
export function useMotion(override?: MotionPreference): MotionSettings {
  const { scheme, durationScale, reducedMotion } =
    React.useContext(MotionContext)
  const osReduced = usePrefersReducedMotion()
  const reduced =
    reducedMotion === "always" || (reducedMotion === "user" && osReduced)
  return { scheme: reduced ? "none" : (override ?? scheme), durationScale }
}

/** True when the OS asks for reduced motion. */
export function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  )
}

/**
 * Turns a spring into a CSS `linear()` easing and duration, so plain CSS
 * transitions can run the same M3 physics (without velocity carry-over).
 *
 *   const { easing, duration } = springToCSS(springs.expressive.fastSpatial)
 *   el.style.transition = `transform ${duration}ms ${easing}`
 */
export function springToCSS(config: SpringConfig, samples = 40) {
  let duration = 0
  for (let t = 0; t <= 3000; t++) {
    const [x, v] = solveSpring(config, -1, 0, t / 1000)
    if (Math.abs(x) > 0.001 || Math.abs(v) > 0.01) duration = t + 1
  }
  const points = Array.from({ length: samples + 1 }, (_, i) => {
    const [x] = solveSpring(config, -1, 0, (duration * i) / samples / 1000)
    return +(1 + x).toFixed(4)
  })
  points[samples] = 1
  return { easing: `linear(${points.join(", ")})`, duration }
}

// Colour springs

/** CSS colour properties that useSpringColors can animate. */
export type ColorProperty =
  "background-color" | "color" | "border-color" | "outline-color"

/**
 * Parses a computed colour (rgb(), oklab() or color(srgb ...), which is what
 * browsers report for named, hex and color-mix() colours) into premultiplied
 * Oklab: [L*a, A*a, B*a, alpha]. Premultiplying keeps fades to and from
 * transparent from passing through black.
 */
function toPremultipliedOklab(css: string): number[] | null {
  const parts = css
    .match(/-?[\d.]+(?:e-?\d+)?%?/g)
    ?.map((p) => (p.endsWith("%") ? parseFloat(p) / 100 : parseFloat(p)))
  if (!parts || parts.length < 3) return null
  const alpha = parts[3] ?? 1
  let lab: number[]

  if (css.startsWith("oklab(")) {
    lab = parts.slice(0, 3)
  } else if (css.startsWith("color(srgb")) {
    lab = srgbToOklab(parts[0], parts[1], parts[2])
  } else if (css.startsWith("rgb")) {
    lab = srgbToOklab(parts[0] / 255, parts[1] / 255, parts[2] / 255)
  } else {
    return null
  }
  return [lab[0] * alpha, lab[1] * alpha, lab[2] * alpha, alpha]
}

function formatOklab([l, a, b, alpha]: number[]) {
  const k = alpha > 0 ? 1 / alpha : 0
  return `oklab(${l * k} ${a * k} ${b * k} / ${Math.min(1, Math.max(0, alpha))})`
}

// https://bottosson.github.io/posts/oklab/
function srgbToOklab(r: number, g: number, b: number) {
  const lin = (c: number) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  const [R, G, B] = [lin(r), lin(g), lin(b)]
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

const sameColor = (a: number[], b: number[]) =>
  a.every((v, i) => Math.abs(v - b[i]) < 1e-4)

/** Fires when page-level styling may have changed: a theme class or attribute on <html>/<body>, or the OS colour scheme. */
function subscribeStyleEnvironment(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true })
  observer.observe(document.body, { attributes: true })
  const scheme = window.matchMedia("(prefers-color-scheme: dark)")
  scheme.addEventListener("change", onChange)
  return () => {
    observer.disconnect()
    scheme.removeEventListener("change", onChange)
  }
}

/**
 * Springs colour changes on an element with the M3 default effects spring.
 *
 * CSS stays the source of truth: when `deps` change, the hook reads the new
 * computed colours and springs from the old ones, writing inline styles only
 * while moving. At rest the inline styles are removed, so theme switches and
 * className overrides apply as normal. Pseudo-class changes (`hover:bg-*`)
 * aren't observed and apply instantly.
 */
export function useSpringColors(
  ref: React.RefObject<HTMLElement | null>,
  properties: readonly ColorProperty[],
  motion: MotionSettings,
  deps: React.DependencyList
) {
  const colorSprings = React.useRef(new Map<ColorProperty, Spring<number[]>>())
  const propertyKey = properties.join()
  const settings = React.useRef(motion)

  const sync = React.useCallback(
    (animate: boolean) => {
      const el = ref.current
      if (!el) return
      for (const property of properties) {
        // Read the CSS value underneath any in-flight inline override
        const inline = el.style.getPropertyValue(property)
        if (inline) el.style.removeProperty(property)
        const target = toPremultipliedOklab(
          getComputedStyle(el).getPropertyValue(
            property === "border-color" ? "border-top-color" : property
          )
        )
        if (inline) el.style.setProperty(property, inline)
        if (!target) continue

        const spring = colorSprings.current.get(property)
        if (!spring) {
          colorSprings.current.set(
            property,
            new Spring(
              target,
              (value) => el.style.setProperty(property, formatOklab(value)),
              () => el.style.removeProperty(property),
              0.001
            )
          )
        } else if (!sameColor(target, spring.target)) {
          const { scheme, durationScale } = settings.current
          if (!animate || scheme === "none") spring.set(target)
          else spring.to(target, springs[scheme].defaultEffects, durationScale)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref, propertyKey]
  )

  React.useLayoutEffect(() => {
    settings.current = motion
    sync(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sync, motion.scheme, motion.durationScale, ...deps])

  // Theme switches restyle the element without a React render: follow them instantly
  React.useEffect(() => subscribeStyleEnvironment(() => sync(false)), [sync])

  React.useEffect(() => {
    const active = colorSprings.current
    return () => active.forEach((spring) => spring.stop())
  }, [])
}
