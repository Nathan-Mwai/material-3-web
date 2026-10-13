"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Slottable } from "radix-ui/slot"
import { cn } from "@/lib/utils"
import { Spring, springs, useMotion, type MotionPreference } from "@/lib/motion"

/**
 * Material 3 (Expressive) common button.
 * Spec: https://m3.material.io/components/buttons/specs
 *
 * Every number below comes from the M3 button tokens:
 *
 * | size | height | padding | icon | gap | radius round / square / pressed | label        |
 * | ---- | ------ | ------- | ---- | --- | -------------------------------- | ------------ |
 * | xs   | 32     | 12      | 20   | 4   | full / 12 / 8                    | label-large  |
 * | sm   | 40     | 16      | 20   | 8   | full / 12 / 8                    | label-large  |
 * | md   | 56     | 24      | 24   | 8   | full / 16 / 12                   | title-medium |
 * | lg   | 96     | 48      | 32   | 12  | full / 28 / 16                   | headline-sm  |
 * | xl   | 136    | 64      | 40   | 16  | full / 28 / 16                   | headline-lg  |
 *
 * "full" is written as half the height (not 9999px) so the corner radius can
 * animate smoothly into the pressed and selected shapes.
 *
 * The corner radius is driven by a spring (see useShapeSpring), not a CSS
 * transition. CSS still owns the target values through the --btn-radius-*
 * variables, so overriding them in className keeps working.
 */

const buttonVariants = cva(
  [
    "relative isolate inline-flex shrink-0 items-center justify-center",
    "whitespace-nowrap select-none cursor-pointer no-underline",
    // Colour and elevation on the "fast effects" curve
    "[transition:background-color_150ms_cubic-bezier(0.31,0.94,0.34,1),color_150ms_cubic-bezier(0.31,0.94,0.34,1),box-shadow_150ms_cubic-bezier(0.31,0.94,0.34,1)]",
    "motion-reduce:transition-none",
    // --btn-radius-live is written by the spring; before hydration the resting radius applies
    "rounded-[var(--btn-radius-live,var(--btn-radius))]",
    // State layer: content colour at 8% hover, 10% focus, 10% pressed
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]",
    "before:bg-current before:opacity-0 before:transition-opacity before:duration-150",
    "hover:before:opacity-8 focus-visible:before:opacity-10 active:before:opacity-10",
    // 48x48 minimum touch target, centred, even when the button is smaller
    "after:absolute after:top-1/2 after:left-1/2 after:size-full after:min-h-12 after:min-w-12 after:-translate-1/2",
    // Focus indicator: 3px secondary outline, 2px offset
    "outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-m3-secondary",
    // Disabled: on-surface container at 10%, content at 38%, no elevation or state layer
    "data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:shadow-none",
    "data-disabled:bg-m3-on-surface/10 data-disabled:text-m3-on-surface/38 data-disabled:before:hidden",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        elevated: "",
        filled: "",
        tonal: "",
        outlined:
          "border border-m3-outline-variant bg-transparent text-m3-on-surface-variant data-disabled:bg-transparent",
        text: "bg-transparent text-m3-primary data-disabled:bg-transparent",
      },
      size: {
        xs: "h-8 gap-1 px-3 text-sm/5 font-medium tracking-[0.1px] [--btn-radius-pressed:8px] [--btn-radius-round:16px] [--btn-radius-square:12px] [&_svg]:size-5",
        sm: "h-10 gap-2 px-4 text-sm/5 font-medium tracking-[0.1px] [--btn-radius-pressed:8px] [--btn-radius-round:20px] [--btn-radius-square:12px] [&_svg]:size-5",
        md: "h-14 gap-2 px-6 text-base/6 font-medium tracking-[0.15px] [--btn-radius-pressed:12px] [--btn-radius-round:28px] [--btn-radius-square:16px] [&_svg]:size-6",
        lg: "h-24 gap-3 px-12 text-2xl/8 font-normal [--btn-radius-pressed:16px] [--btn-radius-round:48px] [--btn-radius-square:28px] [&_svg]:size-8",
        xl: "h-34 gap-4 px-16 text-[32px]/10 font-normal [--btn-radius-pressed:16px] [--btn-radius-round:68px] [--btn-radius-square:28px] [&_svg]:size-10",
      },
      shape: {
        round: "[--btn-radius:var(--btn-radius-round)]",
        square: "[--btn-radius:var(--btn-radius-square)]",
      },
      // "default" = plain button. "selected" / "unselected" = toggle button.
      toggle: {
        default: "",
        selected: "",
        unselected: "",
      },
    },
    // Elevation: level 1 = 0 1px 2px 0 / 0 1px 3px 1px, level 2 = 0 1px 2px 0 / 0 2px 6px 2px.
    // Hover lifts one level; pressed drops back to the resting level.
    compoundVariants: [
      // Elevated
      {
        variant: "elevated",
        toggle: ["default", "unselected"],
        className:
          "bg-m3-surface-container-low text-m3-primary shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_2px_6px_2px_rgb(0_0_0/0.15)] active:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      },
      {
        variant: "elevated",
        toggle: "selected",
        className:
          "bg-m3-primary text-m3-on-primary shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_2px_6px_2px_rgb(0_0_0/0.15)] active:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      },
      // Filled
      {
        variant: "filled",
        toggle: ["default", "selected"],
        className:
          "bg-m3-primary text-m3-on-primary hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] active:shadow-none",
      },
      {
        variant: "filled",
        toggle: "unselected",
        className:
          "bg-m3-surface-container text-m3-on-surface-variant hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] active:shadow-none",
      },
      // Tonal
      {
        variant: "tonal",
        toggle: ["default", "unselected"],
        className:
          "bg-m3-secondary-container text-m3-on-secondary-container hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] active:shadow-none",
      },
      {
        variant: "tonal",
        toggle: "selected",
        className:
          "bg-m3-secondary text-m3-on-secondary hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] active:shadow-none",
      },
      // Outlined
      {
        variant: "outlined",
        toggle: "selected",
        className:
          "border-transparent bg-m3-inverse-surface text-m3-inverse-on-surface data-disabled:bg-m3-on-surface/10",
      },
      // Outline width scales with the larger sizes
      { variant: "outlined", size: "lg", className: "border-2" },
      { variant: "outlined", size: "xl", className: "border-3" },
    ],
    defaultVariants: {
      variant: "filled",
      size: "sm",
      shape: "round",
      toggle: "default",
    },
  }
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>
type ButtonShape = NonNullable<VariantProps<typeof buttonVariants>["shape"]>

export interface ButtonProps extends React.ComponentProps<"button"> {
  /** Emphasis, from highest to lowest: filled, tonal, elevated, outlined, text. */
  variant?: ButtonVariant
  /** xs (32px), sm (40px), md (56px), lg (96px), xl (136px). */
  size?: ButtonSize
  /** Resting shape. Toggle buttons morph to the other shape when selected. */
  shape?: ButtonShape
  /**
   * Turns the button into a toggle button (`aria-pressed`). Leave undefined
   * for a regular button. Not supported by the `text` variant.
   */
  selected?: boolean
  /** Render the child element (e.g. a link) with button styles. */
  asChild?: boolean
  /** Icon shown before the label. Decorative: hidden from screen readers. */
  leadingIcon?: React.ReactNode
  /** Icon shown after the label. Decorative: hidden from screen readers. */
  trailingIcon?: React.ReactNode
  /**
   * Motion scheme for the shape spring. Defaults to the nearest
   * MotionProvider, else "expressive". Reduced-motion users always get "none".
   */
  motion?: MotionPreference
}

type Handler<E> = ((event: E) => void) | undefined

/** Runs the consumer's handler first; ours is skipped if they call preventDefault(). */
function compose<E extends React.SyntheticEvent>(
  theirs: Handler<E>,
  ours: (event: E) => void
) {
  return (event: E) => {
    theirs?.(event)
    if (!event.defaultPrevented) ours(event)
  }
}

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    }
  }
}

const isPressKey = (key: string) => key === " " || key === "Enter"

/**
 * Springs the corner radius between the resting and pressed shapes.
 * Targets are read from the computed --btn-radius / --btn-radius-pressed,
 * and the spring writes --btn-radius-live without re-rendering React.
 */
function useShapeSpring(
  settings: ReturnType<typeof useMotion>,
  deps: React.DependencyList
) {
  const node = React.useRef<HTMLElement | null>(null)
  const spring = React.useRef<Spring | null>(null)
  const pressed = React.useRef(false)
  const motion = React.useRef(settings)

  const animate = React.useCallback(() => {
    const el = node.current
    if (!el) return
    const target = parseFloat(
      getComputedStyle(el).getPropertyValue(
        pressed.current ? "--btn-radius-pressed" : "--btn-radius"
      )
    )
    if (Number.isNaN(target)) return

    if (!spring.current) {
      spring.current = new Spring(target, (value) =>
        el.style.setProperty("--btn-radius-live", `${Math.max(0, value)}px`)
      )
      spring.current.set(target)
    } else if (motion.current.scheme === "none") {
      spring.current.set(target)
    } else if (target !== spring.current.target || spring.current.isAnimating) {
      const { scheme, durationScale } = motion.current
      spring.current.to(target, springs[scheme].fastSpatial, durationScale)
    }
  }, [])

  // Resting shape, size or className changed: spring to the new resting radius
  React.useLayoutEffect(() => {
    motion.current = settings
    animate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, settings.scheme, settings.durationScale, ...deps])

  React.useEffect(() => () => spring.current?.stop(), [])

  const press = React.useCallback(
    (down: boolean) => {
      if (pressed.current === down) return
      pressed.current = down
      animate()
    },
    [animate]
  )

  return { node, press }
}

function Button({
  className,
  variant = "filled",
  size = "sm",
  shape = "round",
  selected,
  asChild = false,
  leadingIcon,
  trailingIcon,
  disabled,
  motion,
  ref,
  children,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  const isToggle = selected !== undefined && variant !== "text"
  const toggle = !isToggle ? "default" : selected ? "selected" : "unselected"
  // Selected toggle buttons swap shape: round -> square, square -> round
  const restingShape: ButtonShape =
    toggle === "selected" ? (shape === "round" ? "square" : "round") : shape
  const isDisabled = Boolean(disabled || props["aria-disabled"])
  // Links can't be `disabled`; take them out of the tab order instead
  const disabledLinkProps = isDisabled
    ? { "aria-disabled": true, tabIndex: -1 }
    : {}

  const motionSettings = useMotion(motion)
  const shapeSpring = useShapeSpring(motionSettings, [
    restingShape,
    size,
    className,
  ])

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-selected={isToggle ? selected : undefined}
      data-disabled={isDisabled ? "" : undefined}
      data-motion={motionSettings.scheme}
      aria-pressed={isToggle ? selected : undefined}
      {...(asChild ? disabledLinkProps : { type: "button" as const, disabled })}
      className={cn(
        buttonVariants({ variant, size, shape: restingShape, toggle }),
        className
      )}
      {...props}
      ref={mergeRefs(ref, shapeSpring.node)}
      onPointerDown={compose(
        onPointerDown,
        (e) => e.button === 0 && shapeSpring.press(true)
      )}
      onPointerUp={compose(onPointerUp, () => shapeSpring.press(false))}
      onPointerLeave={compose(onPointerLeave, () => shapeSpring.press(false))}
      onPointerCancel={compose(onPointerCancel, () => shapeSpring.press(false))}
      onKeyDown={compose(
        onKeyDown,
        (e) => isPressKey(e.key) && !e.repeat && shapeSpring.press(true)
      )}
      onKeyUp={compose(
        onKeyUp,
        (e) => isPressKey(e.key) && shapeSpring.press(false)
      )}
      onBlur={compose(onBlur, () => shapeSpring.press(false))}
    >
      {leadingIcon && (
        <span aria-hidden className="inline-flex">
          {leadingIcon}
        </span>
      )}
      {asChild ? <Slottable>{children}</Slottable> : children}
      {trailingIcon && (
        <span aria-hidden className="inline-flex">
          {trailingIcon}
        </span>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
export default Button
