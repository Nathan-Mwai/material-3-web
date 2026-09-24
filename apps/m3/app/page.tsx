"use client";

import * as React from "react";
import Button from "@/registry/material-v1/ui/button";

const EditIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

type VariantKey = "elevated" | "filled" | "tonal" | "outlined" | "text";

const variants: { variant: VariantKey; label: string }[] = [
  { variant: "elevated", label: "Elevated" },
  { variant: "filled", label: "Filled" },
  { variant: "tonal", label: "Tonal" },
  { variant: "outlined", label: "Outlined" },
  { variant: "text", label: "Text" },
];

export default function Page() {
  const [isDark, setIsDark] = React.useState(false);
  const [isPlayingRound, setIsPlayingRound] = React.useState(false);
  const [isPlayingSquare, setIsPlayingSquare] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
    const [selected, setSelected] = React.useState(false);

  return (
    <main className="min-h-screen p-8 md:p-12 flex flex-col items-center bg-background text-foreground transition-colors duration-200">
      {/* Header & Theme switcher */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8 pb-4 border-b border-outline-variant">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Material 3 Button States & Shape Morph
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Click and hold buttons to observe the dynamic corner morph to compact radius (8dp/12dp/16dp).
          </p>
        </div>
        <Button
          variant="outlined"
          size="xs"
          onClick={() => setIsDark((prev) => !prev)}
        >
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </div>

      {/* Section 1: Shape Morph Interactive Demo (Mirroring Image 5) */}
      <section className="w-full max-w-5xl mb-12 p-6 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          Interactive Shape Morph & Toggle (Press & Hold to see corner compression)
        </h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-on-surface-variant font-medium">Row A: Round (Pill → 8dp press morph)</span>
            <Button
              shape="round"
              size="sm"
              variant="tonal"
              selected={isPlayingRound}
              leadingIcon={isPlayingRound ? <PauseIcon /> : <PlayIcon />}
              onClick={() => setIsPlayingRound((prev) => !prev)}
            >
              {isPlayingRound ? "Pause" : "Play"}
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs text-on-surface-variant font-medium">Row B: Square (12dp → 8dp press morph)</span>
            <Button
              shape="square"
              size="sm"
              variant="tonal"
              selected={isPlayingSquare}
              leadingIcon={isPlayingSquare ? <PauseIcon /> : <PlayIcon />}
              onClick={() => setIsPlayingSquare((prev) => !prev)}
            >
              {isPlayingSquare ? "Pause" : "Play"}
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: 5 States across all 5 Variants */}
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr] items-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant/70 pb-2">
          <span>Variant</span>
          <span className="text-center">1. Enabled</span>
          <span className="text-center">2. Disabled</span>
          <span className="text-center">3. Interactive (Hover/Press)</span>
          <span className="text-center">4. Selected Toggle</span>
        </div>

        {variants.map(({ variant, label }) => (
          <div
            key={variant}
            className="grid grid-cols-[100px_1fr_1fr_1fr_1fr] items-center py-2 gap-2"
          >
            <span className="text-sm font-medium text-on-surface-variant">
              {label}
            </span>

            {/* 1. Enabled */}
            <div className="flex justify-center">
              <Button variant={variant} leadingIcon={<EditIcon />}>
                Enabled
              </Button>
            </div>

            {/* 2. Disabled */}
            <div className="flex justify-center">
              <Button variant={variant} disabled leadingIcon={<EditIcon />}>
                Disabled
              </Button>
            </div>

            {/* 3. Interactive (Hover/Press morph) */}
            <div className="flex justify-center">
              <Button variant={variant} leadingIcon={<EditIcon />}>
                Hover / Press
              </Button>
            </div>

            {/* 4. Selected Toggle */}
            <div className="flex justify-center">
              {variant !== "text" ? (
                <Button variant={variant} selected leadingIcon={<EditIcon />}>
                  Selected
                </Button>
              ) : (
                <span className="text-xs text-on-surface-variant/40">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
       <Button variant="filled" disabled leadingIcon={<EditIcon />}>
        Large Morph (Press Me)
      </Button>
    </main>
  );
}
