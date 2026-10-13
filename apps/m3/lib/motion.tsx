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

const REST_DISTANCE = 0.01
const REST_VELOCITY = 0.1

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

/**
 * A damped spring (mass 1) driven by requestAnimationFrame.
 * Retargeting mid-flight keeps the current velocity, so interrupted motion
 * carries its momentum instead of restarting.
 */
export class Spring {
  value: number
  velocity = 0
  target: number
  private config: SpringConfig = springs.expressive.fastSpatial
  private durationScale = 1
  private frame = 0
  private last = 0

  constructor(
    value: number,
    private onUpdate: (value: number) => void,
    private onRest?: (value: number) => void
  ) {
    this.value = value
    this.target = value
  }

  get isAnimating() {
    return this.frame !== 0
  }

  /** `durationScale` > 1 slows the spring down (5 = five times slower) without changing its shape. */
  to(target: number, config: SpringConfig, durationScale = 1) {
    this.target = target
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
  set(value: number) {
    this.stop()
    this.value = this.target = value
    this.velocity = 0
    this.onUpdate(value)
    this.onRest?.(value)
  }

  stop() {
    cancelAnimationFrame(this.frame)
    this.frame = 0
  }

  private tick = (now: number) => {
    const elapsed = (now - this.last) / 1000 / this.durationScale
    this.last = now
    const [offset, velocity] = solveSpring(
      this.config,
      this.value - this.target,
      this.velocity,
      elapsed
    )
    this.value = this.target + offset
    this.velocity = velocity

    if (
      Math.abs(this.value - this.target) < REST_DISTANCE &&
      Math.abs(this.velocity) < REST_VELOCITY
    ) {
      this.frame = 0
      this.set(this.target)
      return
    }

    this.onUpdate(this.value)
    this.frame = requestAnimationFrame(this.tick)
  }
}

interface MotionSettings {
  scheme: MotionPreference
  durationScale: number
}

const MotionContext = React.createContext<MotionSettings>({
  scheme: "expressive",
  durationScale: 1,
})

/**
 * Sets the motion for every M3 component below it.
 * `durationScale` slows every spring down for debugging, like Android's
 * "Animator duration scale" developer option. Leave it at 1 in production.
 */
export function MotionProvider({
  scheme = "expressive",
  durationScale = 1,
  children,
}: {
  scheme?: MotionPreference
  durationScale?: number
  children: React.ReactNode
}) {
  const value = React.useMemo(
    () => ({ scheme, durationScale }),
    [scheme, durationScale]
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
  const { scheme, durationScale } = React.useContext(MotionContext)
  const reduced = React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  )
  return { scheme: reduced ? "none" : (override ?? scheme), durationScale }
}
