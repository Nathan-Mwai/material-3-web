"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// useId output contains characters that break url(#id) references
function useSvgId(prefix: string) {
  return prefix + React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
}

/** Square hanko stamp carrying "M3": the site's mark. */
export function Seal({ className }: { className?: string }) {
  const rough = useSvgId("seal")
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-9", className)}>
      <defs>
        <filter id={rough}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </defs>
      <g filter={`url(#${rough})`}>
        <rect x="3" y="3" width="58" height="58" rx="5" fill="var(--seal)" />
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          rx="2"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="2"
        />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="var(--paper)"
          fontSize="26"
          fontWeight="700"
          style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
        >
          M3
        </text>
      </g>
    </svg>
  )
}

/** A single tapered brush stroke, used as divider and underline. */
export function BrushStroke({ className }: { className?: string }) {
  const dry = useSvgId("brush")
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("h-3 w-full", className)}
    >
      <defs>
        <filter id={dry}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.6" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>
      <path
        filter={`url(#${dry})`}
        fill="currentColor"
        d="M4 13 C 46 7, 132 5, 214 8 S 352 13, 396 9 C 398 12, 394 15, 388 15 C 330 19, 236 15, 150 16 S 40 20, 6 17 C 2 16, 2 14, 4 13 Z"
      />
    </svg>
  )
}

// Maps a flat rectangle onto the isometric floor plane
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)"

const LAYERS = [
  { n: 1, title: "Focus ring", note: "3px secondary outline, 2px offset" },
  { n: 2, title: "Label and icon", note: "label-large type, 20px icon slot" },
  { n: 3, title: "State layer", note: "8% on hover, 10% on focus and press" },
  { n: 4, title: "Container", note: "every color is an m3 token" },
  { n: 5, title: "Touch target", note: "48 × 48 minimum, even on xs" },
] as const

/**
 * Exploded isometric view of the Button's real layers, from button.tsx.
 * Numbers in the drawing match the legend, which carries the readable text.
 */
export function IsometricButton({ className }: { className?: string }) {
  const hatch = useSvgId("hatch")
  const step = 62
  const y = (i: number) => 22 + i * step

  return (
    <figure className={cn("flex flex-col items-center gap-6", className)}>
      <svg
        viewBox="0 0 360 430"
        role="img"
        aria-label="Exploded isometric drawing of the Button's five layers"
        className="w-full max-w-[22rem] shrink-0 text-ink"
      >
        <defs>
          <pattern id={hatch} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--ink-muted)" strokeWidth="1.2" />
          </pattern>
        </defs>

        {/* Explode axes */}
        <g stroke="var(--wash)" strokeDasharray="3 5" strokeWidth="1">
          <line x1="11" y1={y(0) + 40} x2="11" y2={y(4) + 40} />
          <line x1="270" y1={y(0) + 110} x2="270" y2={y(4) + 110} />
        </g>

        {[...LAYERS].reverse().map((layer) => {
          const i = layer.n - 1
          return (
            <g key={layer.n} transform={`translate(80 ${y(i)})`}>
              <g transform={ISO}>
                {layer.n === 5 && (
                  <rect x="-8" y="-10" width="236" height="100" rx="12" fill="none" stroke="var(--ink-muted)" strokeDasharray="6 5" strokeWidth="1.5" />
                )}
                {layer.n === 4 && (
                  <rect x="0" y="0" width="220" height="80" rx="40" fill="var(--seal)" />
                )}
                {layer.n === 3 && (
                  <rect x="0" y="0" width="220" height="80" rx="40" fill={`url(#${hatch})`} stroke="var(--ink-muted)" strokeWidth="1.2" />
                )}
                {layer.n === 2 && (
                  <>
                    <rect x="0" y="0" width="220" height="80" rx="40" fill="none" stroke="var(--wash)" strokeWidth="1" strokeDasharray="2 4" />
                    <path d="M62 40 l10 10 l18 -20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="104" y="51" fill="currentColor" fontSize="30" fontWeight="600" style={{ fontFamily: "var(--font-roboto), sans-serif" }}>
                      Save
                    </text>
                  </>
                )}
                {layer.n === 1 && (
                  <rect x="-9" y="-9" width="238" height="98" rx="49" fill="none" stroke="currentColor" strokeWidth="3" />
                )}
              </g>
              <line x1="190" y1="110" x2="214" y2="110" stroke="var(--wash)" strokeWidth="1" />
              <circle cx="228" cy="110" r="13" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" />
              <text x="228" y="115.5" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">
                {layer.n}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption>
        <ol className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          {LAYERS.map((layer) => (
            <li key={layer.n} className="grid grid-cols-[1.75rem_1fr] gap-x-2">
              <span className="font-mono text-ink-muted">{layer.n}</span>
              <span className="font-semibold">{layer.title}</span>
              <span className="col-start-2 text-ink-muted">{layer.note}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
