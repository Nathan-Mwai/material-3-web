"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { Slottable } from "radix-ui/slot"
import { cn } from "cn"
import { ButtonProps, buttonVariants } from "./button"

export type MorphButtonProps = ButtonProps

// Deterministic M3 horizontal padding map (px)
const SIZE_HORIZONTAL_PADDING: Record<string, number> = {
  xs: 24, // px-3 (12px * 2)
  sm: 32, // px-4 (16px * 2)
  md: 48, // px-6 (24px * 2)
  lg: 96, // px-12 (48px * 2)
  xl: 128, // px-16 (64px * 2)
}

// Deterministic M3 min-width map (px)
const SIZE_MIN_WIDTH: Record<string, number> = {
  xs: 48,
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
}

// Circular dimensions map (px)
const CIRCLE_DIMENSIONS: Record<string, number> = {
  xs: 32,
  sm: 40,
  md: 56,
  lg: 96,
  xl: 136,
}

const morphAnimationStyles = `
@keyframes m3-morph-exit {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.92); }
}
@keyframes m3-morph-enter {
  0% { opacity: 0; transform: scale(0.92); }
  100% { opacity: 1; transform: scale(1); }
}
.m3-morph-exit-anim {
  animation: m3-morph-exit 140ms cubic-bezier(0.2, 0, 0, 1) forwards;
}
.m3-morph-enter-anim {
  animation: m3-morph-enter 200ms cubic-bezier(0.2, 0, 0, 1) forwards;
}
`

export function MorphButton({
  className,
  variant = "filled",
  size = "sm",
  asChild = false,
  shape = "round",
  toggle = "none",
  leadingIcon,
  trailingIcon,
  style,
  children,
  ref,
  ...props
}: MorphButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const innerRef = React.useRef<HTMLSpanElement>(null)
  const [measuredWidth, setMeasuredWidth] = React.useState<number | undefined>(undefined)

  // Track previous content for fluid dissolve/crossfade during label changes
  const [prevContent, setPrevContent] = React.useState<{
    children: React.ReactNode
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
  } | null>(null)
  const [isCrossfading, setIsCrossfading] = React.useState(false)
  const lastContentRef = React.useRef({ children, leadingIcon, trailingIcon })

  const setButtonRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && typeof ref === "object" && "current" in ref) {
        ;(ref as React.RefObject<HTMLButtonElement | null>).current = node
      }
    },
    [ref]
  )

  // Detect content changes and orchestrate fluid content morphing
  React.useEffect(() => {
    const prev = lastContentRef.current
    const hasChanged =
      prev.children !== children ||
      prev.leadingIcon !== leadingIcon ||
      prev.trailingIcon !== trailingIcon

    if (!hasChanged) return

    // Check if this is a single-character keystroke (e.g. typing in an input)
    const isSingleCharEdit =
      typeof children === "string" &&
      typeof prev.children === "string" &&
      (children.startsWith(prev.children) || prev.children.startsWith(children)) &&
      Math.abs(children.length - prev.children.length) === 1

    lastContentRef.current = { children, leadingIcon, trailingIcon }

    if (isSingleCharEdit) {
      // Direct update without transition delay for rapid typing responsiveness
      setPrevContent(null)
      setIsCrossfading(false)
      return
    }

    // Multi-character change or icon change: execute fluid dissolve morph
    setPrevContent(prev)
    setIsCrossfading(true)

    const timer = setTimeout(() => {
      setPrevContent(null)
      setIsCrossfading(false)
    }, 240)

    return () => clearTimeout(timer)
  }, [children, leadingIcon, trailingIcon])

  // Intrinsic measurement calculation
  React.useLayoutEffect(() => {
    if (!buttonRef.current || !innerRef.current) return

    const measure = () => {
      if (!buttonRef.current || !innerRef.current) return

      const sizeKey = size ?? "sm"

      if (shape === "circle") {
        const circleSize = CIRCLE_DIMENSIONS[sizeKey] || 40
        setMeasuredWidth(circleSize)
        return
      }

      const computed = window.getComputedStyle(buttonRef.current)
      const pl = parseFloat(computed.paddingLeft) || 0
      const pr = parseFloat(computed.paddingRight) || 0
      const targetPadding = SIZE_HORIZONTAL_PADDING[sizeKey] ?? (pl + pr)
      const minW = SIZE_MIN_WIDTH[sizeKey] ?? 48
      const contentW = innerRef.current.scrollWidth
      const newWidth = Math.max(minW, Math.ceil(contentW + targetPadding))

      setMeasuredWidth(newWidth)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(innerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [children, leadingIcon, trailingIcon, size, shape])

  return (
    <>
      <style>{morphAnimationStyles}</style>
      <Comp
        ref={setButtonRef}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-shape={shape}
        data-toggle={toggle}
        style={{
          width: measuredWidth ? `${measuredWidth}px` : undefined,
          ...style,
        }}
        className={cn(
          buttonVariants({ variant, size, shape, toggle }),
          // Synchronized transitions across all layout dimensions, typography, and shape
          "transition-[width,height,padding,font-size,gap,border-radius,transform,box-shadow,background-color,color,border-color,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
          className
        )}
        {...props}
      >
        {/* Isolated clipping container preserving outer touch target (48x48px min) while containing content */}
        <span className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-[inherit] pointer-events-none">
          {/* Outgoing dissolving content during multi-character or icon transitions */}
          {prevContent && (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center gap-[inherit] whitespace-nowrap select-none m3-morph-exit-anim"
            >
              {prevContent.leadingIcon && <span className="shrink-0">{prevContent.leadingIcon}</span>}
              {prevContent.children}
              {prevContent.trailingIcon && <span className="shrink-0">{prevContent.trailingIcon}</span>}
            </span>
          )}

          {/* Active incoming content */}
          <span
            ref={innerRef}
            className={cn(
              "inline-flex items-center justify-center gap-[inherit] whitespace-nowrap",
              isCrossfading && "m3-morph-enter-anim"
            )}
          >
            {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
            {asChild ? <Slottable>{children}</Slottable> : children}
            {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
          </span>
        </span>
      </Comp>
    </>
  )
}

export default MorphButton
