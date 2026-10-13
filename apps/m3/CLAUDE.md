@AGENTS.md
## Verifying components
- After changing a component in src/components,  use the Playwright click-through.
- For visual or interaction changes, use the browser tools to open the
  Storybook story, click the button, check its states, and report console errors.
- Don't mark a UI task done until those checks pass.