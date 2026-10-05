"use client"

import * as React from "react"
import Button from '@/registry/material-v1/ui/button'
import MorphButton from '@/registry/material-v1/ui/morph-button'

// --- Simple inline SVG icons for testing ---
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Loader = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full animate-spin">
    <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
)

export default function ButtonPlayground() {
  const [status, setStatus] = React.useState<"idle" | "saving" | "done">("idle")
  const [isToggled, setIsToggled] = React.useState(false)

  // Simulate an async action to test the MorphButton's fluid resizing
  const handleMorphClick = () => {
    setStatus("saving")
    setTimeout(() => setStatus("done"), 1500)
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <div className="min-h-screen bg-background p-12 text-foreground space-y-16 max-w-5xl mx-auto pb-32">
      
      {/* 1. THE DYNAMIC MORPH TEST */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">1. The Morph Test (ResizeObserver)</h2>
          <p className="text-sm text-muted-foreground">Click to change state. Watch the button width animate smoothly instead of snapping.</p>
        </div>
        <div className="flex gap-4">
          <MorphButton
            size="lg"
            variant={status === "done" ? "tonal" : "filled"}
            leadingIcon={status === "saving" ? <Loader /> : status === "done" ? <Check /> : undefined}
            trailingIcon={status === "idle" ? <ArrowRight /> : undefined}
            onClick={handleMorphClick}
            disabled={status === "saving"}
          >
            {status === "idle" && "Submit Order"}
            {status === "saving" && "Processing..."}
            {status === "done" && "Success"}
          </MorphButton>
        </div>
      </section>

      {/* 2. STATIC VARIANTS (Standard Button) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Variants (Stateless Server Components)</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="filled">Filled</Button>
          <Button variant="elevated">Elevated</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </div>
      </section>

      {/* 3. SHAPES & SIZES */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Shapes & Scaled Sizes</h2>
        
        {/* Round Family */}
        <div className="flex flex-wrap items-end gap-4 border-b pb-6">
          <Button shape="round" size="xs">Round XS</Button>
          <Button shape="round" size="sm">Round SM</Button>
          <Button shape="round" size="md">Round MD</Button>
          <Button shape="round" size="lg">Round LG</Button>
        </div>

        {/* Square Family */}
        <div className="flex flex-wrap items-end gap-4 border-b pb-6">
          <Button shape="square" variant="tonal" size="xs">Square XS</Button>
          <Button shape="square" variant="tonal" size="sm">Square SM</Button>
          <Button shape="square" variant="tonal" size="md">Square MD</Button>
          <Button shape="square" variant="tonal" size="lg">Square LG</Button>
        </div>

        {/* Circle Family */}
        <div className="flex flex-wrap items-end gap-4">
          <Button shape="circle" variant="outlined" size="xs"><Check /></Button>
          <Button shape="circle" variant="outlined" size="sm"><Check /></Button>
          <Button shape="circle" variant="outlined" size="md"><Check /></Button>
          <Button shape="circle" variant="outlined" size="lg"><Check /></Button>
        </div>
      </section>

      {/* 4. TOGGLE STATES (Material 3 Toggle Logic) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. M3 Toggle States</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button 
            variant="tonal" 
            toggle={isToggled ? "selected" : "unselected"} 
            leadingIcon={isToggled ? <Check /> : undefined}
            onClick={() => setIsToggled(!isToggled)}
          >
            {isToggled ? "Subscribed" : "Subscribe"}
          </Button>
          
          <Button 
            variant="outlined" 
            toggle={isToggled ? "selected" : "unselected"} 
            onClick={() => setIsToggled(!isToggled)}
          >
            {isToggled ? "Filter Active" : "Enable Filter"}
          </Button>
        </div>
      </section>

      {/* 5. RADIX asChild COMPOSITION */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Radix Slot (asChild)</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild leadingIcon={<ArrowRight />} variant="elevated">
            {/* The <a> tag inherits the button styles and merges perfectly with the icon! */}
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
              Go to shadcn
            </a>
          </Button>
        </div>
      </section>

    </div>
  )
}