"use client";

import * as React from "react";
import Link from "next/link";
import Button from "@/registry/material-v1/ui/button";

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-primary">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-primary">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

export default function HomePage() {
  const [copied, setCopied] = React.useState(false);
  const [interactiveSelected, setInteractiveSelected] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"pnpm" | "npm" | "bun">("pnpm");

  const commands = {
    pnpm: "pnpm dlx @m3/ui add button",
    npm: "npx @m3/ui add button",
    bun: "bunx @m3/ui add button",
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
      {/* Hero Band per DESIGN.md */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Column: Headlines, CTAs, Install command */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-medium">
            <SparkleIcon />
            <span>Material 3 for Web Registry</span>
            <span className="text-on-secondary-container/50">•</span>
            <span className="text-primary font-semibold">Alpha</span>
          </div>

          {/* Display-Large Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[57px] font-normal tracking-tight text-on-surface leading-[1.12]">
            Material 3 Design for <span className="text-primary font-medium">React</span>
          </h1>

          {/* Body-Large Lead Paragraph */}
          <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            A shadcn-style registry where developers preview, copy, and install accessible Material 3 components as source code they own. Zero hardcoded hexes, native state layers, and spring physics.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/components/button">
              <Button size="md" variant="filled" trailingIcon={<ArrowRightIcon />}>
                Explore Button Component
              </Button>
            </Link>

            <Link href="/components">
              <Button size="md" variant="tonal">
                Component Catalog
              </Button>
            </Link>
          </div>

          {/* Install Command Hero per DESIGN.md */}
          <div className="w-full max-w-md mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span>Quick Install</span>
              <div className="flex items-center gap-1 bg-surface-container-high px-1.5 py-0.5 rounded-full text-[11px]">
                {(["pnpm", "npm", "bun"] as const).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setActiveTab(pm)}
                    className={`px-2 py-0.5 rounded-full transition-colors ${
                      activeTab === pm
                        ? "bg-secondary-container text-on-secondary-container font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between w-full h-12 px-4 rounded-full bg-surface-container-highest font-mono text-xs sm:text-sm text-on-surface border border-outline-variant/30">
              <span className="truncate">{commands[activeTab]}</span>
              <Button
                shape="circle"
                size="xs"
                variant="text"
                onClick={copyCommand}
                aria-label="Copy install command"
                className="shrink-0 ml-2"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Component Preview Cluster */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-outline-variant/50 shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Live Component Preview
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-medium">
                M3 Spring Physics
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs text-on-surface-variant">
                Test the live Button variants, toggle states, and 8dp press morph directly below:
              </p>

              {/* Variant showcase buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="filled" size="sm">
                  Filled (Primary)
                </Button>
                <Button variant="tonal" size="sm">
                  Tonal
                </Button>
                <Button variant="elevated" size="sm">
                  Elevated
                </Button>
                <Button variant="outlined" size="sm">
                  Outlined
                </Button>
              </div>

              {/* Interactive morph toggle */}
              <div className="pt-2 flex flex-col gap-2">
                <span className="text-[11px] text-on-surface-variant font-medium">
                  Toggle Selection State (Click to switch):
                </span>
                <Button
                  variant="filled"
                  shape="round"
                  size="md"
                  morphWidth
                  selected={interactiveSelected}
                  onClick={() => setInteractiveSelected((prev) => !prev)}
                >
                  {interactiveSelected
                    ? "Selected Active (Primary)"
                    : "Unselected (Surface Container)"}
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant">
              <span>Full documentation ready</span>
              <Link href="/components/button" className="text-primary font-medium hover:underline flex items-center gap-1">
                View API & Specs <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
