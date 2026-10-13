# Button

Material 3 Expressive common button. Source: [`button.tsx`](./button.tsx).

Spec: [overview](https://m3.material.io/components/buttons/overview) ·
[specs](https://m3.material.io/components/buttons/specs) ·
[guidelines](https://m3.material.io/components/buttons/guidelines) ·
[accessibility](https://m3.material.io/components/buttons/accessibility)

## Status

The button has the M3 Expressive structure (sizes, shapes, colors, shape morph).
Its motion is still an approximation: a CSS curve instead of real spring physics.

## Deliverables

### Done

- [x] **Sizes:** all five Expressive sizes (XS 32px to XL 136px), each with the spec's padding, icon size, gap and type scale.
- [x] **Shapes:** round and square, using the Expressive corner radii.
- [x] **Press:** the corners tighten while the button is held (8 / 8 / 12 / 16 / 16px for XS to XL), then spring back.
- [x] **Toggle:** selecting a button swaps its shape (round becomes square, square becomes round), and the colors follow the Expressive tokens.
- [x] **Motion feel:** the corner change uses a curve tuned to the "fast spatial" spring (`cubic-bezier(0.42, 1.67, 0.21, 0.9)`, 350ms), so it slightly overshoots.
- [x] **Colors and states:** taken from the current Expressive tokens. For example, outlined uses `outline-variant` for the border and `on-surface-variant` for the label.

### To do

- [ ] **Real spring physics:** replace the fixed CSS curve with a simulated spring, so releasing mid-animation carries its velocity and settles naturally, like Compose's spring motion.
- [ ] **Keyboard press:** make Enter trigger the corner change. Space usually does in Chromium; Enter does not.
- [ ] **Motion scheme:** let the consumer choose between M3's standard and expressive motion. It is hard-coded to expressive today.
- [ ] **Button groups:** the Expressive behavior where a pressed button widens and squeezes its neighbors. This belongs to a separate Button Group component.
- [ ] **Related components:** icon buttons, split buttons and FABs.
