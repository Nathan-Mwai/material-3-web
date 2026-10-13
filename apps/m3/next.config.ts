import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Codespaces serves the dev server through forwarded ports; without these,
  // Next blocks its dev scripts and the page never hydrates.
  allowedDevOrigins: ["127.0.0.1", "*.app.github.dev"],
}

export default nextConfig
