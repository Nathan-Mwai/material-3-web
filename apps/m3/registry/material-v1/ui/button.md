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

The corner radius runs on the M3 **fast spatial** spring. Pressing tightens
the corners, releasing springs them back, and a selected toggle springs to
its other shape. Releasing mid-press keeps the spring's velocity, so it turns
around smoothly instead of restarting. Positions come from the exact spring
equation (the same approach as Compose), so the motion is identical at 30, 60
or 144fps.

| scheme       | damping | stiffness | feel                             |
| ------------ | ------- | --------- | -------------------------------- |
| `expressive` | 0.6     | 800       | overshoots 9.5%, settles ~300ms  |
| `standard`   | 0.9     | 1400      | overshoots 0.15%, settles ~140ms |
| `none`       |         |           | snaps; forced for reduced motion |

**Why the two can look alike.** The overshoot is a percentage of the distance
the corner travels. A small button only travels 12px (20px to 8px), so
expressive overshoots by about 1px. It reads as "snappy with a little give"
rather than a visible bounce. On `lg` and `xl` it grows to 3 to 5px. The
playground draws both curves under the button, and its Slow motion control
lets you watch the bounce on the real button.

Pick a scheme per button, or once for the whole app:

```tsx
;<Button motion="standard">Save</Button>

// app/layout.tsx
import { MotionProvider } from "@/lib/motion"

;<MotionProvider scheme="standard">{children}</MotionProvider>
```

The prop wins over the provider, and users with `prefers-reduced-motion`
always get `none`.

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

**Reusing the spring.** `lib/motion.tsx` exports `Spring`, the `springs`
tokens for both schemes, `solveSpring` (the exact solution, handy for charts
and tests), `MotionProvider` and `useMotion`, so other components can share
the same physics.

## Deliverables

### Done

- [x] **Sizes:** all five Expressive sizes (XS 32px to XL 136px), each with the spec's padding, icon size, gap and type scale.
- [x] **Shapes:** round and square, using the Expressive corner radii.
- [x] **Press:** the corners tighten while the button is held (8 / 8 / 12 / 16 / 16px for XS to XL), then spring back.
- [x] **Toggle:** selecting a button swaps its shape (round becomes square, square becomes round), and the colors follow the Expressive tokens.
- [x] **Real spring physics:** the corner radius is a simulated spring (M3 fast spatial tokens), not a CSS curve. Releasing mid-animation carries its velocity.
- [x] **Keyboard press:** Enter and Space both press the shape.
- [x] **Motion scheme:** `motion="expressive" | "standard" | "none"` per button, or `MotionProvider` app-wide. Reduced motion is respected automatically.
- [x] **Colors and states:** taken from the current Expressive tokens. For example, outlined uses `outline-variant` for the border and `on-surface-variant` for the label.

### To do

- [ ] **Spring colors:** background, label and elevation still use a CSS curve. M3 drives them with the effects springs (damping 1, no overshoot), so the difference is small.
- [ ] **Button groups:** the Expressive behavior where a pressed button widens and squeezes its neighbors. This belongs to a separate Button Group component.
- [ ] **Related components:** icon buttons, split buttons and FABs.
