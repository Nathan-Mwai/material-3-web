# Material 3 UI Pattern Registry

Established to maintain strict visual and structural consistency across all Material 3 components in this repository.

---

### Button

File: `apps/m3/registry/material-v1/ui/button.tsx`
Last updated: 2026-10-05

| Property | Class / Pattern |
| --- | --- |
| Background | `bg-m3-primary` (filled), `bg-m3-secondary-container` (tonal), `bg-m3-surface-container-low` (elevated), `bg-transparent` (outlined, text) |
| Border | `border border-m3-outline` (outlined), `border border-m3-outline-variant` (elevated unselected) |
| Border radius | `rounded-[20px]` (round sm), `rounded-[28px]` (round md), `rounded-[16px]` (round xs), `rounded-[48px]` (round lg), `rounded-[68px]` (round xl); active shape compression: `active:rounded-[8px]` / `active:rounded-[12px]` |
| Text: primary | `text-m3-on-primary` (filled), `text-m3-primary` (elevated, outlined, text) |
| Text: secondary | `text-m3-on-secondary-container` (tonal), `text-m3-on-surface` (unselected filled), `text-m3-on-surface-variant` (unselected tonal) |
| Spacing | `h-8 px-3 gap-1` (xs), `h-10 px-4 gap-2` (sm), `h-14 px-6 gap-2` (md), `h-24 px-12 gap-3` (lg), `h-[136px] px-16 gap-4` (xl) |
| Hover state | `hover:opacity-95 active:opacity-90`, `hover:shadow-xs active:shadow-none` |
| Focus state | `focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface` |
| Shadow | `shadow-xs hover:shadow-md active:shadow-xs` (elevated) |
| Touch Target | `after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']` (48px min accessible target) |
| Motion | `transition-[border-radius,width,transform,box-shadow,background-color,color,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] active:duration-300 active:scale-[0.98]` |

**Pattern notes:**
- Complies strictly with Material 3 token hierarchy. Never use arbitrary colors or raw hex values.
- Buttons guarantee 48x48px accessible tap targets across all sizes via pseudo-element padding.
- Employs fluid shape morphing (300ms press compression, 500ms release) and GPU acceleration.
- Radix Slot delegation via `asChild` prop enables semantic anchor (`<Link>`) composition without breaking button variant classes.

---

### MorphButton

File: `apps/m3/registry/material-v1/ui/morph-button.tsx`
Last updated: 2026-10-05

| Property | Class / Pattern |
| --- | --- |
| Inherited Styles | All variants, shapes, sizes, and states from `buttonVariants` (`button.tsx`) |
| Width Measurement | `measuredWidth` calculated via `useLayoutEffect` and `ResizeObserver` on `innerRef.scrollWidth` + computed `paddingLeft` + `paddingRight` |
| Inner Wrapper | `<span ref={innerRef} className="inline-flex items-center justify-center gap-[inherit] whitespace-nowrap overflow-visible">` |
| Inline Style | `style={{ width: measuredWidth ? \`${measuredWidth}px\` : undefined, ...style }}` |
| Touch Target | `after:absolute after:min-h-[48px] after:min-w-[48px] after:content-['']` (48px min accessible target) |
| Motion | Inherited cubic-bezier transition (`cubic-bezier(0.2,0,0,1)`) across `width`, `border-radius`, `transform`, `box-shadow` |
| Slot Delegation | Radix `Slot.Root` and `Slottable` support for polymorphic element rendering |

**Pattern notes:**
- Seamless dynamic morphing: By explicitly measuring inner scrollWidth and adding padding, MorphButton bypasses the CSS auto-width interpolation limitation.
- Reactive layout reflow: Neighboring buttons in flex containers glide smoothly to accommodate the width shift without jarring jumps.
- Clean unmount safety: Disconnects the `ResizeObserver` listener on unmount to prevent memory leaks.

