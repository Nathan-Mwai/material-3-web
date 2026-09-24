import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

export const buttonVariants = cva(
  [
    // Base container geometry and typography per M3 spec (40px height, pill shape, label-large)
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "h-10 rounded-full font-medium text-sm leading-5 tracking-[0.1px] whitespace-nowrap",
    "bg-foreground text-background outline-none transition-colors cursor-pointer",
    "gap-2",
    // Accessible touch target (48x48px min)
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    // Focus ring
    "focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-38",
    // Icon sizing: 18px for SVGs (shadcn/Lucide) and font icons (Google Material Symbols)
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-[18px]",
    "[&_.material-symbols-outlined]:text-[18px] [&_.material-symbols]:text-[18px] [&_.material-icons]:text-[18px]",
  ],
  {
    variants: {
      hasLeadingIcon: {
        true: "pl-4 pr-6",
        false: "px-6",
      },
      hasTrailingIcon: {
        true: "pr-4 pl-6",
        false: "",
      },
      /*
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
        rounded: "",
        compact: "",
        square: "rounded-none",
      },
      */
    },

    compoundVariants: [
      { hasLeadingIcon: true, hasTrailingIcon: true, className: "px-4" },
      /*
      { shape: "rounded", size: "xs", className: "rounded-[12px]" },
      { shape: "rounded", size: "sm", className: "rounded-[12px]" },
      { shape: "rounded", size: "md", className: "rounded-[16px]" },
      { shape: "rounded", size: "lg", className: "rounded-[28px]" },
      { shape: "rounded", size: "xl", className: "rounded-[28px]" },

      { shape: "compact", size: "xs", className: "rounded-[8px]" },
      { shape: "compact", size: "sm", className: "rounded-[8px]" },
      { shape: "compact", size: "md", className: "rounded-[12px]" },
      { shape: "compact", size: "lg", className: "rounded-[16px]" },
      { shape: "compact", size: "xl", className: "rounded-[16px]" },

      { variant: "filled", color: "primary", className: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800" },
      { variant: "elevated", color: "primary", className: "text-indigo-600 hover:bg-indigo-50/50 dark:text-indigo-400" },
      { variant: "tonal", color: "primary", className: "bg-indigo-100 text-indigo-950 hover:bg-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-200" },
      { variant: "outlined", color: "primary", className: "border-indigo-200 text-indigo-600 hover:bg-indigo-50/60 dark:border-indigo-800 dark:text-indigo-400" },
      { variant: "text", color: "primary", className: "text-indigo-600 hover:bg-indigo-50/60 dark:text-indigo-400" },

      { variant: "filled", color: "secondary", className: "bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900" },
      { variant: "elevated", color: "secondary", className: "text-slate-700 hover:bg-slate-50 dark:text-slate-300" },
      { variant: "tonal", color: "secondary", className: "bg-slate-200 text-slate-900 hover:bg-slate-300/80 dark:bg-slate-800 dark:text-slate-200" },
      { variant: "outlined", color: "secondary", className: "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300" },
      { variant: "text", color: "secondary", className: "text-slate-700 hover:bg-slate-100 dark:text-slate-300" },

      { variant: "filled", color: "destructive", className: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800" },
      { variant: "elevated", color: "destructive", className: "text-red-600 hover:bg-red-50 dark:text-red-400" },
      { variant: "tonal", color: "destructive", className: "bg-red-100 text-red-950 hover:bg-red-200/80 dark:bg-red-950 dark:text-red-200" },
      { variant: "outlined", color: "destructive", className: "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400" },
      { variant: "text", color: "destructive", className: "text-red-600 hover:bg-red-50 dark:text-red-400" },
      */
    ],

    defaultVariants: {
      hasLeadingIcon: false,
      hasTrailingIcon: false,
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    const hasLeading = Boolean(leadingIcon);
    const hasTrailing = Boolean(trailingIcon);

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({
            hasLeadingIcon: hasLeading,
            hasTrailingIcon: hasTrailing,
            className,
          })
        )}
        {...props}
      >
        {leadingIcon}
        {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
        {trailingIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
