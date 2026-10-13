"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import Button from "@/registry/material-v1/ui/button"
import { cn } from "@/lib/utils"

const noop = () => () => {}

/**
 * A code block with a copy button. "{origin}" in `code` becomes this site's
 * origin, so the registry URL is right on localhost and once deployed.
 */
export function CopyCommand({
  code,
  label,
  className,
}: {
  code: string
  label: string
  className?: string
}) {
  const origin = React.useSyncExternalStore(
    noop,
    () => window.location.origin,
    () => null
  )
  const [status, setStatus] = React.useState<"idle" | "copied" | "failed">(
    "idle"
  )
  const resetTimer = React.useRef<number>(undefined)
  React.useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const needsOrigin = code.includes("{origin}")
  const ready = !needsOrigin || origin !== null
  const text = origin ? code.replaceAll("{origin}", origin) : code

  async function copy() {
    window.clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(text)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2400)
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start gap-2 rounded-lg border border-wash/50 bg-paper-raised py-1.5 pr-1.5 pl-4">
        <pre
          tabIndex={0}
          aria-label={label}
          className="sumi-focus min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-[0.8125rem]/6 whitespace-pre"
        >
          <code aria-busy={!ready}>
            {ready ? text : code.replaceAll("{origin}", "https://…")}
          </code>
        </pre>
        <Button
          variant="text"
          size="xs"
          onClick={copy}
          disabled={!ready}
          aria-label={`Copy: ${label}`}
          className="text-ink-muted"
        >
          {status === "copied" ? <Check /> : <Copy />}
        </Button>
      </div>
      <p aria-live="polite" className="min-h-5 text-xs text-ink-muted">
        {status === "copied" && "Copied to your clipboard."}
        {status === "failed" &&
          "Your browser blocked the clipboard. Select the text and copy it yourself."}
      </p>
    </div>
  )
}
