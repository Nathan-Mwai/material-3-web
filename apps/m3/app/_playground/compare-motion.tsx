"use client"

import * as React from "react"
import Button, { type ButtonProps } from "@/registry/material-v1/ui/button"
import {
  Spring,
  springs,
  useMotion,
  type MotionPreference,
  type MotionScheme,
} from "@/lib/motion"
import { Segmented, Switch, useSnapOnResize } from "./controls"
import { SpringTrace } from "./spring-trace"

const SCHEMES: MotionScheme[] = ["expressive", "standard"]
export const SLOW_MOTION = ["1x", "5x", "10x"] as const
export type SlowMotion = (typeof SLOW_MOTION)[number]

/** A dot that travels the width of its track on one scheme's fast spatial spring. */
function SpringDot({ scheme, end }: { scheme: MotionScheme; end: boolean }) {
  const motion = useMotion()
  const track = React.useRef<HTMLDivElement>(null)
  const dot = React.useRef<HTMLSpanElement>(null)
  const spring = React.useRef<Spring | null>(null)

  const place = React.useCallback(
    (animate: boolean) => {
      const el = dot.current
      const width = track.current?.clientWidth
      if (!el || !width) return
      const target = end ? width - el.offsetWidth : 0
      if (!spring.current) {
        spring.current = new Spring(target, (x) => {
          el.style.transform = `translateX(${x}px)`
        })
        spring.current.set(target)
      } else if (!animate || motion.scheme === "none") {
        spring.current.set(target)
      } else {
        spring.current.to(
          target,
          springs[scheme].fastSpatial,
          motion.durationScale
        )
      }
    },
    [end, scheme, motion.scheme, motion.durationScale]
  )

  React.useLayoutEffect(() => place(true), [place])

  useSnapOnResize(track, place)

  return (
    <div className="flex items-center gap-4">
      <span className="w-20 shrink-0 text-sm text-m3-on-surface-variant">
        {scheme}
      </span>
      <div ref={track} className="relative h-6 flex-1">
        <span className="absolute inset-x-0 top-1/2 h-px bg-m3-outline-variant" />
        <span
          ref={dot}
          className="absolute top-0 left-0 size-6 rounded-full bg-m3-primary"
        />
      </div>
    </div>
  )
}

export function CompareMotion({
  variant,
  highlight,
  slowMotion,
  onSlowMotion,
  osReducedMotion,
  previewMotion,
  onPreviewMotion,
}: {
  variant: NonNullable<ButtonProps["variant"]>
  highlight: MotionPreference
  slowMotion: SlowMotion
  onSlowMotion: (value: SlowMotion) => void
  osReducedMotion: boolean
  previewMotion: boolean
  onPreviewMotion: (value: boolean) => void
}) {
  const [selected, setSelected] = React.useState(false)
  const toggle = () => setSelected((s) => !s)
  // Text buttons can't be toggles; compare with filled instead
  const compareVariant = variant === "text" ? "filled" : variant

  return (
    <section className="flex flex-col gap-6 rounded-[28px] bg-m3-surface-container-low p-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-prose flex-col gap-1">
          <h2 className="text-lg font-medium text-m3-on-surface">
            Expressive vs standard
          </h2>
          <p className="text-sm text-m3-on-surface-variant">
            Both buttons and both dots start together. Toggle corners use the
            fast spatial spring, the only button spring that differs between
            schemes.
          </p>
        </div>
        <Button variant="tonal" size="sm" onClick={toggle}>
          Play both springs
        </Button>
      </header>

      {osReducedMotion && (
        <div className="flex flex-col gap-3 rounded-2xl bg-m3-secondary-container px-4 py-3 text-sm text-m3-on-secondary-container sm:flex-row sm:items-center sm:justify-between">
          <span>
            Reduce motion is on in your system settings, so animations are off
            on this page.
          </span>
          <Switch
            label="Preview motion"
            checked={previewMotion}
            onChange={onPreviewMotion}
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {SCHEMES.map((scheme) => (
          <div
            key={scheme}
            className="flex h-56 flex-col items-center justify-center gap-4 rounded-2xl border border-m3-outline-variant/60"
          >
            <span className="text-sm text-m3-on-surface-variant">{scheme}</span>
            <Button
              variant={compareVariant}
              size="lg"
              motion={scheme}
              selected={selected}
              onClick={toggle}
            >
              Favorite
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-m3-on-surface">
          The same springs over a longer distance
        </span>
        {SCHEMES.map((scheme) => (
          <SpringDot key={scheme} scheme={scheme} end={selected} />
        ))}
      </div>

      <div className="max-w-sm">
        <Segmented
          label="Slow motion"
          options={SLOW_MOTION}
          value={slowMotion}
          onChange={onSlowMotion}
        />
      </div>

      <SpringTrace
        labels={["unselected", "selected"]}
        from={48}
        to={28}
        token="fastSpatial"
        highlight={highlight}
      />
    </section>
  )
}
