import {cva, type VariantProps} from "class-variance-authority"
import * as React from "react"
import {Slot} from "radix-ui"
import { cn } from "@/lib/utils"
import { Slottable } from "radix-ui/slot"
const buttonVariants = cva(
    [
    // Base layout, interactive behavior, GPU compositing, and accessible touch target
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "font-medium whitespace-nowrap outline-none cursor-pointer transform-gpu",
    // Fluid shape morph and width transition: 500ms release, 300ms press compression
    "transition-[border-radius,width,transform,box-shadow,background-color,color,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:duration-300 active:scale-[0.98]",
    // Accessible touch target (48x48px min)
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    // Focus indicator
    "focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-38 disabled:shadow-none disabled:scale-100",
    // Icon base resets
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
    {
        variants:{
            variant:{
                filled:"",
                elevated:"",
                tonal:"",
                outlined:"",
                text:""
            },
            shape:{
                round:"",
                square:"",
                circle:"aspect-square p-0 min-w-0",
            },
            size: {
        xs: "h-8 px-3 gap-1 text-xs active:rounded-[8px] [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px] [&_.material-symbols]:text-[20px] [&_.material-icons]:text-[20px]",
        sm: "h-10 px-4 gap-2 text-sm active:rounded-[8px] [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px] [&_.material-symbols]:text-[20px] [&_.material-icons]:text-[20px]",
        md: "h-14 px-6 gap-2 text-base active:rounded-[12px] [&_svg]:size-6 [&_.material-symbols-outlined]:text-[24px] [&_.material-symbols]:text-[24px] [&_.material-icons]:text-[24px]",
        lg: "h-24 px-12 gap-3 text-2xl active:rounded-[16px] [&_svg]:size-8 [&_.material-symbols-outlined]:text-[32px] [&_.material-symbols]:text-[32px] [&_.material-icons]:text-[32px]",
        xl: "h-[136px] px-16 gap-4 text-4xl active:rounded-[16px] [&_svg]:size-10 [&_.material-symbols-outlined]:text-[40px] [&_.material-symbols]:text-[40px] [&_.material-icons]:text-[40px]",
      },
            toggle:{
                none:"",
                selected:"",
                unselected:""
            },
        },
        compoundVariants: [
      // Family A: Round buttons
      { shape: "round", size: "xs", className: "rounded-[16px] min-w-[48px]" },
      { shape: "round", size: "sm", className: "rounded-[20px] min-w-[48px]" },
      { shape: "round", size: "md", className: "rounded-[28px] min-w-[64px]" },
      { shape: "round", size: "lg", className: "rounded-[48px] min-w-[96px]" },
      { shape: "round", size: "xl", className: "rounded-[68px] min-w-[128px]" },

      // Family B: Square buttons with curved resting radii
      { shape: "square", size: "xs", className: "rounded-[12px] min-w-[48px]" },
      { shape: "square", size: "sm", className: "rounded-[12px] min-w-[48px]" },
      { shape: "square", size: "md", className: "rounded-[16px] min-w-[64px]" },
      { shape: "square", size: "lg", className: "rounded-[28px] min-w-[96px]" },
      { shape: "square", size: "xl", className: "rounded-[28px] min-w-[128px]" },

      // Family C: Circle shape
      { shape: "circle", size: "xs", className: "w-8 rounded-[16px]" },
      { shape: "circle", size: "sm", className: "w-10 rounded-[20px]" },
      { shape: "circle", size: "md", className: "w-14 rounded-[28px]" },
      { shape: "circle", size: "lg", className: "w-24 rounded-[48px]" },
      { shape: "circle", size: "xl", className: "w-[136px] rounded-[68px]" },

      // Row A: Elevated
      { variant: "elevated", toggle: "none", className: "bg-m3-surface-container-low text-m3-primary shadow-xs hover:shadow-md active:shadow-xs" },
      { variant: "elevated", toggle: "unselected", className: "bg-m3-surface-container-low text-m3-primary border border-m3-outline-variant shadow-none hover:bg-m3-surface-container active:bg-m3-surface-container-high" },
      { variant: "elevated", toggle: "selected", className: "bg-m3-primary text-m3-on-primary shadow-xs hover:shadow-md active:shadow-xs" },

      // Row B: Filled
      { variant: "filled", toggle: "none", className: "bg-m3-primary text-m3-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "filled", toggle: "unselected", className: "bg-m3-surface-container text-m3-on-surface hover:bg-m3-surface-container-high active:bg-m3-surface-container-highest" },
      { variant: "filled", toggle: "selected", className: "bg-m3-primary text-m3-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },

      // Row C: Tonal
      { variant: "tonal", toggle: "none", className: "bg-m3-secondary-container text-m3-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },
      { variant: "tonal", toggle: "unselected", className: "bg-m3-surface-container-low text-m3-on-surface-variant hover:bg-m3-surface-container active:bg-m3-surface-container-high" },
      { variant: "tonal", toggle: "selected", className: "bg-m3-secondary-container text-m3-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90" },

      // Row D: Outlined
      { variant: "outlined", toggle: "none", className: "bg-transparent text-m3-primary border border-m3-outline hover:bg-m3-primary/8 active:bg-m3-primary/12" },
      { variant: "outlined", toggle: "unselected", className: "bg-transparent text-m3-on-surface border border-m3-outline hover:bg-m3-on-surface/8 active:bg-m3-on-surface/12" },
      { variant: "outlined", toggle: "selected", className: "bg-m3-inverse-surface text-m3-inverse-on-surface border border-transparent hover:opacity-95 active:opacity-90" },

      // Row E: Text
      { variant: "text", className: "bg-transparent text-m3-primary hover:bg-m3-primary/8 active:bg-m3-primary/12" },
    ],
        defaultVariants:{
            variant:"filled",
            shape:"round",
            size:"sm",
            toggle:"none"
        }
    }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
        /** 
   * Wraps the button in a Radix Slot. 
   * Useful when wrapping a Next.js `<Link>` or `<a href>` tag to inherit button styles. 
   */
  asChild?: boolean
  /** Element placed before the button text (e.g., an SVG or Icon component) */
  leadingIcon?:React.ReactNode
  /** Element placed after the button text */
  trailingIcon?:React.ReactNode
}


function Button({
    className,
    variant="filled",
    size="sm",
    asChild = false,
    shape="round",
    toggle="none",
    leadingIcon,
    trailingIcon,
    children,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        data-shape={shape}
        data-toggle={toggle}
        className={cn(buttonVariants({variant, size, shape, toggle}), className)}
        {...props}
    >
        {/* 
        Radix Slottable allows us to use `asChild` while still safely injecting 
        our leading and trailing icons alongside the consumer's child element.
      */}
        {leadingIcon && <span className="flex-shrink-0">{leadingIcon}</span>}
        {asChild ?  <Slottable>{children}</Slottable>: children}
        {trailingIcon && <span className="flex-shrink-0">{trailingIcon}</span>}
    </Comp>
  )
}

export {Button, buttonVariants}
export default Button