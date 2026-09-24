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

const VideoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

const MicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const PhoneOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6-6 19.8 19.8 0 0 1-3.12-8.69A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
    <line x1="22" x2="2" y1="2" y2="22" />
  </svg>
);

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function Page() {
  const [isDark, setIsDark] = React.useState(false);
  const [videoOn, setVideoOn] = React.useState(true);
  const [micOn, setMicOn] = React.useState(true);
  const [callActive, setCallActive] = React.useState(true);
  const [filledToggle, setFilledToggle] = React.useState(true);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <main className="min-h-screen p-8 md:p-12 flex flex-col items-center bg-background text-foreground transition-colors duration-200 gap-10">
      {/* Header & Theme switcher */}
      <div className="w-full max-w-4xl flex justify-between items-center pb-4 border-b border-outline-variant">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Material 3 Side Icons & Short Words Morph Test
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Circular side icons now use shape="circle" with exact radii. Short words respect M3 min-width to prevent jitter.
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

      {/* Google Call Interactive Mockup */}
      <section className="w-full max-w-md p-8 rounded-3xl bg-surface-container-low border border-outline-variant flex flex-col items-center gap-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <span className="text-lg font-semibold tracking-tight">
            Appointment - Thea
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            {callActive ? "In the meeting (Connected)" : "Call ended (Disconnected)"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 w-full">
          {/* 1. Video Toggle: Uses shape="circle" size="md" (56px circle: 28dp -> 12dp smooth morph) */}
          <Button
            variant="outlined"
            shape="circle"
            size="md"
            selected={videoOn}
            onClick={() => setVideoOn((v) => !v)}
            aria-label="Toggle camera"
          >
            <VideoIcon />
          </Button>

          {/* 2. End Call / Rejoin Call: 56px height, morphs from 28dp -> 12dp smoothly */}
          <Button
            variant="filled"
            shape="round"
            size="md"
            selected={callActive}
            className="flex-1 px-8 text-base shadow-sm"
            onClick={() => setCallActive((prev) => !prev)}
          >
            {callActive ? "End call" : "Ask to Join"}
          </Button>

          {/* 3. Mic Toggle: Uses shape="circle" size="md" (56px circle: 28dp -> 12dp smooth morph) */}
          <Button
            variant="outlined"
            shape="circle"
            size="md"
            selected={micOn}
            onClick={() => setMicOn((m) => !m)}
            aria-label="Toggle microphone"
          >
            <MicIcon />
          </Button>
        </div>
      </section>

      {/* Short-Word Buttons Test (Testing M3 min-width to verify no jitter) */}
      <section className="w-full max-w-4xl p-6 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          Short-Word Buttons Test (M3 Min-Width Protection)
        </h2>
        <p className="text-xs text-on-surface-variant">
          Buttons with 1-3 letter words. Because M3 min-width (48dp/64dp) is applied, corners never collide or jitter during press!
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <Button size="sm" shape="round">OK</Button>
          <Button size="sm" shape="round" variant="tonal">Go</Button>
          <Button size="sm" shape="square" variant="filled">No</Button>
          <Button size="md" shape="round" variant="elevated">Yes</Button>
          <Button size="md" shape="square" variant="outlined">Play</Button>
          <Button size="md" shape="round" variant="filled">End</Button>
        </div>
      </section>

      {/* Circular Icon Buttons Across All 5 Sizes */}
      <section className="w-full max-w-4xl p-6 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          Side & Circular Icon Buttons (shape="circle" across all sizes)
        </h2>
        <p className="text-xs text-on-surface-variant">
          Press and hold any circle below: notice how it smoothly morphs from circle into a soft rounded square without any snapping!
        </p>
        <div className="flex flex-wrap items-center gap-6 mt-1">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-on-surface-variant">XS (32dp)</span>
            <Button shape="circle" size="xs" variant="tonal">
              <EditIcon />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-on-surface-variant">SM (40dp)</span>
            <Button shape="circle" size="sm" variant="tonal">
              <EditIcon />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-on-surface-variant">MD (56dp)</span>
            <Button shape="circle" size="md" variant="tonal">
              <EditIcon />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-on-surface-variant">LG (96dp)</span>
            <Button shape="circle" size="lg" variant="tonal">
              <EditIcon />
            </Button>
          </div>
        </div>
      </section>

      {/* Precision Morph Test Bench for Standard Buttons */}
      <section className="w-full max-w-4xl p-6 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          Standard Buttons Scale (Round vs Square)
        </h2>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-on-surface-variant font-medium">
            Round Buttons (xs: 16→8dp | sm: 20→8dp | md: 28→12dp | lg: 48→16dp | xl: 68→16dp)
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map((s) => (
              <Button key={s} size={s} shape="round" leadingIcon={<EditIcon />}>
                {s.toUpperCase()} Round
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <span className="text-xs text-on-surface-variant font-medium">
            Square Buttons (xs: 12→8dp | sm: 12→8dp | md: 16→12dp | lg: 28→16dp | xl: 28→16dp)
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map((s) => (
              <Button key={s} size={s} shape="square" variant="tonal" leadingIcon={<EditIcon />}>
                {s.toUpperCase()} Square
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
