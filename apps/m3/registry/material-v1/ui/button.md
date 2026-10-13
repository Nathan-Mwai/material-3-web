# Button

Material 3 Expressive common button. Source: [`button.tsx`](./button.tsx).

Spec: [overview](https://m3.material.io/components/buttons/overview) ·
[specs](https://m3.material.io/components/buttons/specs) ·
[guidelines](https://m3.material.io/components/buttons/guidelines) ·
[accessibility](https://m3.material.io/components/buttons/accessibility)

## Status

The button has the M3 Expressive structure (sizes, shapes, colors) and real
spring physics for its shape morph.

## Install

```bash
npx shadcn@latest add @m3/button
```

This also installs `@m3/utils`, `@m3/tokens` and `@m3/motion`. There is no
animation library to add: the spring lives in `lib/motion.tsx`.

## Motion

Every animation follows Compose's `Button` and `ToggleButton`, which are
generated from the same M3 tokens as the spec site.

| what                       | how it moves                                  |
| -------------------------- | --------------------------------------------- |
| corners, plain button      | default effects spring: never bounces         |
| corners, toggle button     | fast spatial spring: bounces in expressive    |
| fill, label, outline color | default effects spring, interpolated in Oklab |
| elevation                  | 120ms tweens; snaps when disabled             |
| hover and press tint       | 15ms linear; 45ms when keyboard focus arrives |

One intentional difference: Compose switches the fill and label colors
instantly when a toggle is selected. Here they spring, which reads better on
the web.

Springs keep their velocity when interrupted, so releasing mid-press turns
around smoothly. Positions come from the exact spring equation (as in
Compose), so motion is identical at 30, 60 or 144fps.

| scheme       | fast spatial (toggle corners)           | default effects           |
| ------------ | --------------------------------------- | ------------------------- |
| `expressive` | damping 0.6, stiffness 800: 9.5% bounce | damping 1, stiffness 1600 |
| `standard`   | damping 0.9, stiffness 1400: 0.15%      | damping 1, stiffness 1600 |
| `none`       | snaps; forced for reduced motion        | snaps                     |

**Why expressive and standard can look alike.** Only toggle corners use a
spring that differs between schemes; everything else uses default effects,
which is the same in both. Even on toggles, the bounce is a percentage of the
distance the corner travels: about 1px on `sm`, 3 to 5px on `lg` and `xl`.
The playground's "Expressive vs standard" card plays both schemes side by
side: two `lg` toggle buttons, plus two dots that travel the same springs over
a longer distance, where expressive overshoots by about 65px and standard by
1px. Slow motion and a curve plot sit underneath.

Pick a scheme per button, or once for the whole app:

```tsx
<Button motion="standard">Save</Button>
```

```tsx
// app/layout.tsx
import { MotionProvider } from "@/lib/motion"

export default function RootLayout({ children }) {
  return <MotionProvider scheme="standard">{children}</MotionProvider>
}
```

The prop wins over the provider, and users with `prefers-reduced-motion`
get `none`. To force it either way, set `reducedMotion` on the provider:
`"user"` (default, follows the OS), `"always"`, or `"never"`. Only use
`"never"` for a motion preview the viewer explicitly asked for, as the
playground does with its "Preview motion" switch.

**Changing the shape.** The spring reads its targets from CSS variables, so
override them like any Tailwind value:

```tsx
<Button className="[--btn-radius-pressed:4px]">Sharper press</Button>
```

| variable               | meaning                             |
| ---------------------- | ----------------------------------- |
| `--btn-radius-round`   | resting radius for `shape="round"`  |
| `--btn-radius-square`  | resting radius for `shape="square"` |
| `--btn-radius-pressed` | radius while pressed                |
| `--btn-radius-live`    | written by the spring; don't set it |

**Your handlers still run.** `onPointerDown`, `onKeyDown` and the other press
handlers are called first. Call `event.preventDefault()` in one to skip the
press animation for that event.

**Debugging motion.** Slow every spring down without changing its shape, like
Android's "Animator duration scale" developer option:

```tsx
<MotionProvider durationScale={5}>{children}</MotionProvider>
```

Keep it at 1 (the default) in production.

**Colors and your classes.** The color spring reads the target from CSS
whenever the button's props change, so `className="bg-…"` overrides animate
too. Pseudo-class colors such as `hover:bg-…` aren't watched and apply
instantly; use the built-in hover tint (the state layer) for hover feedback.
Theme switches (a class on `<html>` or `<body>`, or the OS setting) apply
instantly, without animating.

**Springs in plain CSS.** `springToCSS` turns any spring into a CSS `linear()`
easing and duration, for elements CSS can animate on its own (no velocity
carry-over, but the same curve):

```tsx
const { easing, duration } = springToCSS(springs.expressive.fastSpatial)
// transition: translate 482ms linear(0, 0.0504, 0.1736, ...)
el.style.transition = `translate ${duration}ms ${easing}`
```

**Reusing the motion.** `lib/motion.tsx` exports `Spring` (springs a number or
an array), the `springs` tokens for both schemes, `solveSpring` (the exact
solution, handy for charts and tests), `springToCSS`, `useSpringColors`,
`MotionProvider`, `useMotion` and `usePrefersReducedMotion`, so other
components share the same physics.

## Deliverables

### Done

- [x] **Sizes:** all five Expressive sizes (XS 32px to XL 136px), each with the spec's padding, icon size, gap and type scale.
- [x] **Shapes:** round and square, using the Expressive corner radii.
- [x] **Press:** the corners tighten while the button is held (8 / 8 / 12 / 16 / 16px for XS to XL), then spring back.
- [x] **Toggle:** selecting a button swaps its shape (round becomes square, square becomes round), and the colors follow the Expressive tokens.
- [x] **Real spring physics:** the corner radius is a simulated spring (M3 fast spatial tokens), not a CSS curve. Releasing mid-animation carries its velocity.
- [x] **Keyboard press:** Enter and Space both press the shape.
- [x] **Motion scheme:** `motion="expressive" | "standard" | "none"` per button, or `MotionProvider` app-wide. Reduced motion is respected automatically.
- [x] **Spring colors:** fill, label and outline colors spring on the default effects spring (in Oklab, premultiplied, so fades to transparent stay clean). Elevation and hover tint use Compose's exact timings.
- [x] **Compose-accurate press:** plain buttons press without bounce; toggle buttons keep the expressive bounce.
- [x] **Colors and states:** taken from the current Expressive tokens. For example, outlined uses `outline-variant` for the border and `on-surface-variant` for the label.

### To do

- [ ] **Button groups:** the Expressive behavior where a pressed button widens and squeezes its neighbors. This belongs to a separate Button Group component.
- [ ] **Related components:** icon buttons, split buttons and FABs.
