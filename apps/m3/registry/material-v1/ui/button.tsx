import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

export const buttonVariants = cva(
  [
    // Base layout, interactive behavior, and accessible touch target
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "font-medium whitespace-nowrap outline-none transition-colors cursor-pointer",
    // Accessible touch target (48x48px min)
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    // Focus ring
    "focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-38",
    // Icon base resets
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      shape: {
        round: "rounded-full",
        square: "",
      },
      size: {
        xs: "h-8 px-3 gap-1 text-xs [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px] [&_.material-symbols]:text-[20px] [&_.material-icons]:text-[20px]",
        sm: "h-10 px-4 gap-2 text-sm [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px] [&_.material-symbols]:text-[20px] [&_.material-icons]:text-[20px]",
        md: "h-14 px-6 gap-2 text-base [&_svg]:size-6 [&_.material-symbols-outlined]:text-[24px] [&_.material-symbols]:text-[24px] [&_.material-icons]:text-[24px]",
        lg: "h-24 px-12 gap-3 text-2xl [&_svg]:size-8 [&_.material-symbols-outlined]:text-[32px] [&_.material-symbols]:text-[32px] [&_.material-icons]:text-[32px]",
        xl: "h-[136px] px-16 gap-4 text-4xl [&_svg]:size-10 [&_.material-symbols-outlined]:text-[40px] [&_.material-symbols]:text-[40px] [&_.material-icons]:text-[40px]",
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
      */
    },

    compoundVariants: [
      // Family B subtle corner radii mapped to container height
      { shape: "square", size: "xs", className: "rounded-[12px]" },
      { shape: "square", size: "sm", className: "rounded-[12px]" },
      { shape: "square", size: "md", className: "rounded-[16px]" },
      { shape: "square", size: "lg", className: "rounded-[28px]" },
      { shape: "square", size: "xl", className: "rounded-[28px]" },
    ],

    defaultVariants: {
      shape: "round",
      size: "sm",
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
      size,
      shape,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot.Root : "button";
    const isToggle = typeof selected === "boolean";
    const toggleState = isToggle ? (selected ? "selected" : "unselected") : "none";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-size={size}
        data-shape={shape}
        aria-pressed={isToggle ? selected : undefined}
        data-selected={isToggle ? selected : undefined}
        data-state={isToggle ? (selected ? "on" : "off") : undefined}
        className={cn(
          buttonVariants({
            size,
            shape,
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
