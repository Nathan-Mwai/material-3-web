import type * as React from 'react';

/**
 * Common HTML custom element props with Material 3 Web Component properties
 */
export type MaterialCustomElementProps<T = HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
> & {
  slot?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  label?: string;
  value?: string | number;
  checked?: boolean;
  indeterminate?: boolean;
  selected?: boolean;
  type?: string;
  placeholder?: string;
  supportingText?: string;
  errorText?: string;
  error?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  name?: string;
  icons?: boolean;
  showOnlySelectedIcon?: boolean;
  lowered?: boolean;
  variant?: 'surface' | 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  elevated?: boolean;
  removable?: boolean;
  open?: boolean;
  quick?: boolean;
  fourColor?: boolean;
  valueText?: string;
  ticks?: boolean;
  labeled?: boolean;
  headline?: string;
  supportingText?: string;
  multiline?: boolean;
  rows?: number;
  cols?: number;
  [key: string]: any;
};

export interface MaterialWebElements {
  // Buttons
  'md-filled-button': MaterialCustomElementProps;
  'md-outlined-button': MaterialCustomElementProps;
  'md-elevated-button': MaterialCustomElementProps;
  'md-text-button': MaterialCustomElementProps;
  'md-filled-tonal-button': MaterialCustomElementProps;

  // FAB
  'md-fab': MaterialCustomElementProps;
  'md-branded-fab': MaterialCustomElementProps;

  // Icon Buttons
  'md-icon': MaterialCustomElementProps;
  'md-icon-button': MaterialCustomElementProps;
  'md-filled-icon-button': MaterialCustomElementProps;
  'md-filled-tonal-icon-button': MaterialCustomElementProps;
  'md-outlined-icon-button': MaterialCustomElementProps;

  // Text Fields & Select
  'md-outlined-text-field': MaterialCustomElementProps;
  'md-filled-text-field': MaterialCustomElementProps;
  'md-outlined-select': MaterialCustomElementProps;
  'md-filled-select': MaterialCustomElementProps;
  'md-select-option': MaterialCustomElementProps;

  // Selection Controls
  'md-checkbox': MaterialCustomElementProps;
  'md-radio': MaterialCustomElementProps;
  'md-switch': MaterialCustomElementProps;
  'md-slider': MaterialCustomElementProps;

  // Chips
  'md-chip-set': MaterialCustomElementProps;
  'md-filter-chip': MaterialCustomElementProps;
  'md-assist-chip': MaterialCustomElementProps;
  'md-input-chip': MaterialCustomElementProps;
  'md-suggestion-chip': MaterialCustomElementProps;

  // Progress & Feedback
  'md-circular-progress': MaterialCustomElementProps;
  'md-linear-progress': MaterialCustomElementProps;
  'md-dialog': MaterialCustomElementProps;
  'md-ripple': MaterialCustomElementProps;

  // Containment & Navigation
  'md-divider': MaterialCustomElementProps;
  'md-elevation': MaterialCustomElementProps;
  'md-list': MaterialCustomElementProps;
  'md-list-item': MaterialCustomElementProps;
  'md-tabs': MaterialCustomElementProps;
  'md-primary-tab': MaterialCustomElementProps;
  'md-secondary-tab': MaterialCustomElementProps;
  'md-menu': MaterialCustomElementProps;
  'md-menu-item': MaterialCustomElementProps;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends MaterialWebElements {}
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends MaterialWebElements {}
  }
}
