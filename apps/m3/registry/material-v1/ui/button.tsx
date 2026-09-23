import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "font-medium whitespace-nowrap transition-all outline-none",
    // Accessible touch target (fixed stray space)
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    // Focus ring
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    // Disabled states
    "disabled:pointer-events-none disabled:opacity-38",
    // SVG resets
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        filled: "shadow-xs",
        elevated: "bg-white shadow-md hover:shadow-lg dark:bg-slate-900",
        tonal: "",
        outlined: "border border-current/20",
        text: "bg-transparent",
      },
      color: {
        primary: "",
        secondary: "",
        destructive: "",
      },
      size: {
        xs: "h-8 px-3 gap-1 text-xs [&_svg]:size-5",          
        sm: "h-10 px-4 gap-2 text-sm [&_svg]:size-5",
        md: "h-14 px-6 gap-2 text-base [&_svg]:size-6",
        lg: "h-24 px-12 gap-3 text-2xl [&_svg]:size-8",
        xl: "h-[136px] px-16 gap-4 text-4xl [&_svg]:size-10",
      },
      shape: {
        pill: "rounded-full",
        rounded: "", // Family B[cite: 1]
        compact: "", // Family C[cite: 1]
        square: "rounded-none",
      },
    },

    compoundVariants: [
      // --- Family B Radii (Image 1) ---[cite: 1]
      { shape: "rounded", size: "xs", className: "rounded-[12px]" },
      { shape: "rounded", size: "sm", className: "rounded-[12px]" },
      { shape: "rounded", size: "md", className: "rounded-[16px]" },
      { shape: "rounded", size: "lg", className: "rounded-[28px]" },
      { shape: "rounded", size: "xl", className: "rounded-[28px]" },

      // --- Family C Radii (Image 1) ---[cite: 1]
      { shape: "compact", size: "xs", className: "rounded-[8px]" },
      { shape: "compact", size: "sm", className: "rounded-[8px]" },
      { shape: "compact", size: "md", className: "rounded-[12px]" },
      { shape: "compact", size: "lg", className: "rounded-[16px]" },
      { shape: "compact", size: "xl", className: "rounded-[16px]" },

      // --- Color: Primary (Indigo) ---
      { variant: "filled", color: "primary", className: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800" },
      { variant: "elevated", color: "primary", className: "text-indigo-600 hover:bg-indigo-50/50 dark:text-indigo-400" },
      { variant: "tonal", color: "primary", className: "bg-indigo-100 text-indigo-950 hover:bg-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-200" },
      { variant: "outlined", color: "primary", className: "border-indigo-200 text-indigo-600 hover:bg-indigo-50/60 dark:border-indigo-800 dark:text-indigo-400" },
      { variant: "text", color: "primary", className: "text-indigo-600 hover:bg-indigo-50/60 dark:text-indigo-400" },

      // --- Color: Secondary (Slate) ---
      { variant: "filled", color: "secondary", className: "bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900" },
      { variant: "elevated", color: "secondary", className: "text-slate-700 hover:bg-slate-50 dark:text-slate-300" },
      { variant: "tonal", color: "secondary", className: "bg-slate-200 text-slate-900 hover:bg-slate-300/80 dark:bg-slate-800 dark:text-slate-200" },
      { variant: "outlined", color: "secondary", className: "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300" },
      { variant: "text", color: "secondary", className: "text-slate-700 hover:bg-slate-100 dark:text-slate-300" },

      // --- Color: Destructive (Red) ---
      { variant: "filled", color: "destructive", className: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800" },
      { variant: "elevated", color: "destructive", className: "text-red-600 hover:bg-red-50 dark:text-red-400" },
      { variant: "tonal", color: "destructive", className: "bg-red-100 text-red-950 hover:bg-red-200/80 dark:bg-red-950 dark:text-red-200" },
      { variant: "outlined", color: "destructive", className: "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400" },
      { variant: "text", color: "destructive", className: "text-red-600 hover:bg-red-50 dark:text-red-400" },
    ],

    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "md",
      shape: "pill",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-shape={shape}
        className={cn(buttonVariants({ variant, size, shape, color, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
