"use client"

import * as React from "react"
import {
  solveSpring,
  springs,
  type MotionPreference,
  type MotionScheme,
  type SpringToken,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const SCHEMES: MotionScheme[] = ["standard", "expressive"]
const DURATION_MS = 450
const STEP_MS = 2
const H = 220
const PAD = { top: 16, right: 16, bottom: 48, left: 112 }

// Same physics the button runs: the exact spring from `from` to `to`, at rest at t=0
function trace(
  scheme: MotionScheme,
  token: SpringToken,
  from: number,
  to: number
) {
  const config = springs[scheme][token]
  const points: number[] = []
  for (let t = 0; t <= DURATION_MS; t += STEP_MS) {
    points.push(to + solveSpring(config, from - to, 0, t / 1000)[0])
  }
  return points
}

function stats(
  scheme: MotionScheme,
  token: SpringToken,
  from: number,
  to: number
) {
  const config = springs[scheme][token]
  const dir = Math.sign(to - from)
  let overshoot = 0
  let settled = 0
  for (let t = 0; t <= 1000; t += 1) {
    const offset = solveSpring(config, from - to, 0, t / 1000)[0]
    overshoot = Math.max(overshoot, offset * dir)
    if (Math.abs(offset) > 0.1) settled = t + 1
  }
  return { overshoot, settled }
}

export function SpringTrace({
  from,
  to,
  token,
  highlight,
  labels = ["start", "end"],
}: {
  /** Resting radius in px. */
  from: number
  /** Pressed radius in px. */
  to: number
  /** Axis labels for `from` and `to`. */
  labels?: [string, string]
  /** The spring the button uses for this press. */
  token: SpringToken
  highlight: MotionPreference
}) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
  // Draw at the real pixel width so the 11px labels stay 11px on phones
  const [W, setW] = React.useState(560)
  const frame = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = frame.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setW(Math.round(entry.contentRect.width))
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const lines = React.useMemo(
    () =>
      SCHEMES.map((s) => ({ scheme: s, points: trace(s, token, from, to) })),
    [token, from, to]
  )
  const rows = SCHEMES.map((s) => ({ scheme: s, ...stats(s, token, from, to) }))
  const bounces = rows[1].overshoot >= 0.05

  const span = Math.abs(from - to)
  const lo = Math.min(from, to) - span * 0.15
  const hi = Math.max(from, to) + span * 0.15
  const x = (i: number) =>
    PAD.left + ((i * STEP_MS) / DURATION_MS) * (W - PAD.left - PAD.right)
  const y = (v: number) =>
    PAD.top + ((hi - v) / (hi - lo)) * (H - PAD.top - PAD.bottom)
  const path = (points: number[]) =>
    points
      .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
      .join("")

  const expressive = lines[1].points
  const troughIndex = expressive.reduce(
    (best, v, i) =>
      Math.abs(v - from) > Math.abs(expressive[best] - from) ? i : best,
    0
  )
  const lastIndex = expressive.length - 1

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * W
    const i = Math.round(
      ((px - PAD.left) / (W - PAD.left - PAD.right)) * (DURATION_MS / STEP_MS)
    )
    setHoverIndex(Math.max(0, Math.min(lastIndex, i)))
  }

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const step = e.shiftKey ? 25 : 5
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault()
      setHoverIndex((i) =>
        Math.max(
          0,
          Math.min(
            lastIndex,
            (i ?? troughIndex) + (e.key === "ArrowRight" ? step : -step)
          )
        )
      )
    }
  }

  const stroke = (scheme: MotionScheme) =>
    scheme === highlight
      ? "stroke-m3-primary"
      : "stroke-[#8f8a95] dark:stroke-m3-outline"

  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-sm font-medium text-m3-on-surface">
          Corner radius when selected, {from}px to {to}px
        </span>
        <span className="flex gap-4 text-xs text-m3-on-surface-variant">
          {SCHEMES.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <svg width="16" height="2" aria-hidden>
                <line
                  x1="0"
                  y1="1"
                  x2="16"
                  y2="1"
                  strokeWidth="2"
                  className={stroke(s)}
                />
              </svg>
              {s}
            </span>
          ))}
        </span>
      </figcaption>

      <div ref={frame} className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-m3-secondary"
          role="img"
          aria-label={`Spring trace. ${rows
            .map(
              (r) =>
                `${r.scheme}: overshoots ${r.overshoot.toFixed(2)}px, settles in ${r.settled}ms`
            )
            .join(". ")}. Use arrow keys to inspect values.`}
          tabIndex={0}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          onFocus={() => setHoverIndex((i) => i ?? troughIndex)}
          onBlur={() => setHoverIndex(null)}
          onKeyDown={onKeyDown}
        >
          {/* Targets: resting and pressed radius */}
          {[from, to].map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(v)}
                y2={y(v)}
                className="stroke-m3-outline-variant"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 8}
                y={y(v)}
                dy="0.35em"
                textAnchor="end"
                className="fill-m3-on-surface-variant text-[11px]"
              >
                {v === from ? labels[0] : labels[1]} {v}px
              </text>
            </g>
          ))}
          {[0, 100, 200, 300, 400].map((ms) => (
            <text
              key={ms}
              x={x(ms / STEP_MS)}
              y={H - 8}
              textAnchor="middle"
              className="fill-m3-on-surface-variant text-[11px]"
            >
              {ms}ms
            </text>
          ))}

          {/* Context line first, highlighted line on top with a surface ring */}
          {[
            ...lines.filter((l) => l.scheme !== highlight),
            ...lines.filter((l) => l.scheme === highlight),
          ].map(({ scheme, points }) => (
            <g key={scheme}>
              {scheme === highlight && (
                <path
                  d={path(points)}
                  fill="none"
                  strokeWidth="6"
                  className="stroke-m3-surface-container-low"
                />
              )}
              <path
                d={path(points)}
                fill="none"
                strokeWidth="2"
                strokeLinejoin="round"
                className={stroke(scheme)}
              />
            </g>
          ))}

          {/* The bounce: where expressive passes the pressed radius */}
          {bounces && (
            <>
              <circle
                cx={x(troughIndex)}
                cy={y(expressive[troughIndex])}
                r="4"
                className={cn(
                  stroke("expressive"),
                  "fill-m3-surface-container-low"
                )}
                strokeWidth="2"
              />
              <text
                x={Math.min(Math.max(x(troughIndex), PAD.left + 70), W - 70)}
                textAnchor="middle"
                y={y(expressive[troughIndex])}
                dy={to < from ? "1.6em" : "-0.9em"}
                className="fill-m3-on-surface text-[11px]"
              >
                expressive overshoots {rows[1].overshoot.toFixed(1)}px
              </text>
            </>
          )}

          {hoverIndex !== null && (
            <line
              x1={x(hoverIndex)}
              x2={x(hoverIndex)}
              y1={PAD.top}
              y2={H - PAD.bottom}
              className="stroke-m3-on-surface-variant"
              strokeWidth="1"
            />
          )}
        </svg>

        {hoverIndex !== null && (
          <div
            className="pointer-events-none absolute top-2 rounded-lg bg-m3-inverse-surface px-3 py-2 text-xs text-m3-inverse-on-surface shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]"
            style={{
              left: `${(x(hoverIndex) / W) * 100}%`,
              transform: `translateX(${hoverIndex > lastIndex / 2 ? "calc(-100% - 8px)" : "8px"})`,
            }}
          >
            <div className="mb-1 opacity-80">{hoverIndex * STEP_MS}ms</div>
            {lines.map(({ scheme, points }) => (
              <div key={scheme} className="flex items-center gap-2">
                <strong className="font-medium tabular-nums">
                  {points[hoverIndex].toFixed(2)}px
                </strong>
                {scheme}
              </div>
            ))}
          </div>
        )}
      </div>

      <table className="w-full text-left text-xs text-m3-on-surface-variant">
        <thead>
          <tr className="border-b border-m3-outline-variant/60">
            <th className="py-1.5 font-medium">Scheme</th>
            <th className="hidden py-1.5 font-medium sm:table-cell">Spring</th>
            <th className="py-1.5 text-right font-medium">Overshoot</th>
            <th className="py-1.5 text-right font-medium">Settles in</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const { dampingRatio, stiffness } = springs[r.scheme][token]
            return (
              <tr
                key={r.scheme}
                className={cn(r.scheme === highlight && "text-m3-on-surface")}
              >
                <td className="py-1.5">{r.scheme}</td>
                <td className="hidden py-1.5 font-mono sm:table-cell">
                  damping {dampingRatio} · stiffness {stiffness}
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {r.overshoot.toFixed(2)}px
                </td>
                <td className="py-1.5 text-right tabular-nums">
                  {r.settled}ms
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </figure>
  )
}
