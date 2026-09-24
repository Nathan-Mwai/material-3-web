import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

export const buttonVariants = cva(
  [
    // Base layout, interactive behavior, accessible touch target, and smooth shape morph transition
    "relative inline-flex items-center justify-center shrink-0 select-none",
    "font-medium whitespace-nowrap outline-none cursor-pointer",
    "transition-[border-radius,box-shadow,background-color,color,opacity] duration-150 ease-out",
    // Accessible touch target (48x48px min)
    "after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']",
    // Focus indicator
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-38 disabled:shadow-none",
    // Icon base resets
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        filled: "",
        elevated: "",
        tonal: "",
        outlined: "",
        text: "",
      },
      shape: {
        round: "rounded-full",
        square: "",
      },
      size: {
        // Active states apply M3 compact corner morph (Family C) on press
        xs: "h-8 px-3 gap-1 text-xs active:rounded-[8px] [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px] [&_.material-symbols]:text-[20px] [&_.material-icons]:text-[20px]",
        sm: "h-10 px-4 gap-2 text-sm active:rounded-[8px] [&_svg]:size-5 [&_.material-symbols-outlined]:text-[20px] [&_.material-symbols]:text-[20px] [&_.material-icons]:text-[20px]",
        md: "h-14 px-6 gap-2 text-base active:rounded-[12px] [&_svg]:size-6 [&_.material-symbols-outlined]:text-[24px] [&_.material-symbols]:text-[24px] [&_.material-icons]:text-[24px]",
        lg: "h-24 px-12 gap-3 text-2xl active:rounded-[16px] [&_svg]:size-8 [&_.material-symbols-outlined]:text-[32px] [&_.material-symbols]:text-[32px] [&_.material-icons]:text-[32px]",
        xl: "h-[136px] px-16 gap-4 text-4xl active:rounded-[16px] [&_svg]:size-10 [&_.material-symbols-outlined]:text-[40px] [&_.material-symbols]:text-[40px] [&_.material-icons]:text-[40px]",
      },
      toggle: {
        none: "",
        selected: "",
        unselected: "",
      },
    },

    compoundVariants: [
      // Resting Family B subtle corner radii mapped to container height
      { shape: "square", size: "xs", className: "rounded-[12px]" },
      { shape: "square", size: "sm", className: "rounded-[12px]" },
      { shape: "square", size: "md", className: "rounded-[16px]" },
      { shape: "square", size: "lg", className: "rounded-[28px]" },
      { shape: "square", size: "xl", className: "rounded-[28px]" },

      // Row A: Elevated button (Level 1 elevation at rest, Level 2 on hover, Level 1 on press)
      {
        variant: "elevated",
        toggle: "none",
        className:
          "bg-surface-container-low text-primary shadow-xs hover:shadow-md active:shadow-xs",
      },
      {
        variant: "elevated",
        toggle: "unselected",
        className:
          "bg-surface-container-low text-primary border border-outline-variant shadow-none hover:bg-surface-container active:bg-surface-container-high",
      },
      {
        variant: "elevated",
        toggle: "selected",
        className:
          "bg-primary text-on-primary shadow-xs hover:shadow-md active:shadow-xs",
      },

      // Row B: Filled button (Level 0 resting, Level 1 on hover)
      {
        variant: "filled",
        toggle: "none",
        className:
          "bg-primary text-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90",
      },
      {
        variant: "filled",
        toggle: "unselected",
        className:
          "bg-surface-container text-on-surface hover:bg-surface-container-high active:bg-surface-container-highest",
      },
      {
        variant: "filled",
        toggle: "selected",
        className:
          "bg-primary text-on-primary hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90",
      },

      // Row C: Tonal button (Level 0 resting, Level 1 on hover)
      {
        variant: "tonal",
        toggle: "none",
        className:
          "bg-secondary-container text-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90",
      },
      {
        variant: "tonal",
        toggle: "unselected",
        className:
          "bg-surface-container-low text-on-surface-variant hover:bg-surface-container active:bg-surface-container-high",
      },
      {
        variant: "tonal",
        toggle: "selected",
        className:
          "bg-secondary-container text-on-secondary-container hover:shadow-xs active:shadow-none hover:opacity-95 active:opacity-90",
      },

      // Row D: Outlined button
      {
        variant: "outlined",
        toggle: "none",
        className:
          "bg-transparent text-primary border border-outline hover:bg-primary/8 active:bg-primary/12",
      },
      {
        variant: "outlined",
        toggle: "unselected",
        className:
          "bg-transparent text-on-surface border border-outline hover:bg-on-surface/8 active:bg-on-surface/12",
      },
      {
        variant: "outlined",
        toggle: "selected",
        className:
          "bg-inverse-surface text-inverse-on-surface border border-transparent hover:opacity-95 active:opacity-90",
      },

      // Row E: Text button
      {
        variant: "text",
        className:
          "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12",
      },
    ],

    defaultVariants: {
      variant: "filled",
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
      variant,
      size,
      shape,
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
        data-variant={variant}
        data-size={size}
        data-shape={shape}
        aria-pressed={isToggle ? selected : undefined}
        data-selected={isToggle ? selected : undefined}
        data-state={isToggle ? (selected ? "on" : "off") : undefined}
        className={cn(
          buttonVariants({
            variant,
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
