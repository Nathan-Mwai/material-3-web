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

export default function Page() {
  const [interactiveSelected, setInteractiveSelected] = React.useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 bg-background">
      {/* Visual match to M3 specification diagram */}
      <div className="flex flex-wrap items-center gap-6">
        {/* 1. Standard Button */}
        <Button leadingIcon={<EditIcon />}>Label</Button>

        {/* 2. Unselected Toggle Button */}
        <Button selected={false} leadingIcon={<EditIcon />}>
          Unselected
        </Button>

        {/* 2. Selected Toggle Button */}
        <Button selected={true} leadingIcon={<EditIcon />}>
          Selected
        </Button>
      </div>

      {/* Interactive test showing developer useState wiring */}
      <div className="flex flex-col items-center gap-2">
        <Button
          selected={interactiveSelected}
          leadingIcon={<EditIcon />}
          onClick={() => setInteractiveSelected((prev) => !prev)}
        >
          {interactiveSelected ? "Selected (Click to toggle)" : "Unselected (Click to toggle)"}
        </Button>
      </div>
    </main>
  );
}
