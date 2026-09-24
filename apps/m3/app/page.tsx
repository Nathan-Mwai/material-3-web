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

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const sizeLabels = {
  xs: "Extra small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
};

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-12 bg-background">
      {/* 1. Round shape (Family A: rounded-full) */}
      <section className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
          Round Shape (Family A)
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {sizes.map((s) => (
            <Button key={s} size={s} shape="round" leadingIcon={<EditIcon />}>
              {sizeLabels[s]}
            </Button>
          ))}
        </div>
      </section>

      {/* 2. Square shape (Family B: compound rounded-[x]dp) */}
      <section className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
          Square Shape (Family B)
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {sizes.map((s) => (
            <Button key={s} size={s} shape="square" leadingIcon={<EditIcon />}>
              {sizeLabels[s]}
            </Button>
          ))}
        </div>
      </section>
      <Button >Am I ok</Button>
    </main>
  );
}
