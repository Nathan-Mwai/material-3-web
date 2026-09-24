import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

export const buttonVariants = cva(
  [
    // Base container geometry and typography per M3 spec (40px height, pill shape, label-large)
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "h-10 rounded-full font-medium text-sm leading-5 tracking-[0.1px] whitespace-nowrap",
    "outline-none transition-colors cursor-pointer",
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
      toggle: {
        none: "bg-foreground text-background hover:opacity-90",
        selected: "bg-foreground text-background hover:opacity-90",
        unselected:
          "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
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
    ],

    defaultVariants: {
      hasLeadingIcon: false,
      hasTrailingIcon: false,
      toggle: "none",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof buttonVariants>, "toggle"> {
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  selected?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild = false,
      leadingIcon,
      trailingIcon,
      selected,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    const hasLeading = Boolean(leadingIcon);
    const hasTrailing = Boolean(trailingIcon);
    const isToggle = typeof selected === "boolean";
    const toggleState = isToggle ? (selected ? "selected" : "unselected") : "none";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        aria-pressed={isToggle ? selected : undefined}
        data-selected={isToggle ? selected : undefined}
        data-state={isToggle ? (selected ? "on" : "off") : undefined}
        className={cn(
          buttonVariants({
            hasLeadingIcon: hasLeading,
            hasTrailingIcon: hasTrailing,
            toggle: toggleState,
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
