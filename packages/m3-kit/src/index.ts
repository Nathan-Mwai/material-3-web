#!/usr/bin/env node
import { spawn } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const NAMESPACE = "@m3"
const REGISTRY_URL =
  process.env.M3_KIT_REGISTRY ?? "https://m3.nathanmwai.com/r/{name}.json"
const VALUE_FLAGS = new Set(["-c", "--cwd", "-p", "--path"])

const here = dirname(fileURLToPath(import.meta.url))

function fail(message: string): never {
  console.error(`\nm3-kit: ${message}\n`)
  process.exit(1)
}

function readVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(here, "..", "package.json"), "utf8"))
    return pkg.version as string
  } catch {
    return "unknown"
  }
}

// Walk up from this file to find the shadcn package installed alongside m3-kit.
function findShadcnBin(): string {
  let dir = here
  while (true) {
    const pkgPath = join(dir, "node_modules", "shadcn", "package.json")
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"))
      const bin = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.shadcn
      if (bin) return resolve(dirname(pkgPath), bin)
    }
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return fail("could not find the bundled shadcn CLI. Try reinstalling m3-kit.")
}

function runShadcn(args: string[]): Promise<number> {
  const bin = findShadcnBin()
  return new Promise((done) => {
    const child = spawn(process.execPath, [bin, ...args], { stdio: "inherit" })
    child.on("exit", (code) => done(code ?? 1))
    child.on("error", () => done(1))
  })
}

function getCwd(args: string[]): string {
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if ((a === "-c" || a === "--cwd") && args[i + 1]) return resolve(args[i + 1])
    if (a.startsWith("--cwd=")) return resolve(a.slice(6))
  }
  return process.cwd()
}

function splitArgs(args: string[]) {
  const names: string[] = []
  const flags: string[] = []
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith("-")) {
      flags.push(a)
      if (VALUE_FLAGS.has(a) && args[i + 1] !== undefined) flags.push(args[++i])
    } else {
      names.push(a)
    }
  }
  return { names, flags }
}

// Names like "button" get the @m3 prefix; URLs and @namespaced names pass through.
const isExplicit = (n: string) =>
  n.startsWith("@") || n.startsWith("http") || n.includes("/") || n.includes(".")
const toTarget = (n: string) => (isExplicit(n) ? n : `${NAMESPACE}/${n}`)

async function ensureProject(cwd: string): Promise<void> {
  const file = join(cwd, "components.json")

  if (!existsSync(file)) {
    console.log("No components.json found. Running `shadcn init` first...\n")
    const code = await runShadcn(["init", "--cwd", cwd])
    if (code !== 0 || !existsSync(file)) {
      fail("setup did not finish, so no components.json was created.")
    }
  }

  let config: Record<string, any>
  try {
    config = JSON.parse(readFileSync(file, "utf8"))
  } catch {
    fail("components.json is not valid JSON, so I left it unchanged.")
  }

  config.registries ??= {}
  const current = config.registries[NAMESPACE]
  if (current === undefined) {
    config.registries[NAMESPACE] = REGISTRY_URL
    writeFileSync(file, JSON.stringify(config, null, 2) + "\n")
    console.log(`Registered ${NAMESPACE} in components.json`)
  } else if (current !== REGISTRY_URL) {
    console.warn(
      `Note: components.json already sets ${NAMESPACE} to a different value. Leaving it unchanged.`
    )
  }
}

function checkTailwind(cwd: string): void {
  try {
    const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"))
    const version: string | undefined =
      pkg.dependencies?.tailwindcss ?? pkg.devDependencies?.tailwindcss
    if (!version) {
      console.warn("Note: tailwindcss was not found in package.json. M3 components need Tailwind CSS v4.")
      return
    }
    const major = Number(/\d+/.exec(version)?.[0])
    if (major && major < 4) {
      console.warn(`Warning: tailwindcss ${version} found. M3 components need Tailwind CSS v4.`)
    }
  } catch {
    // No readable package.json here (for example a monorepo root). Skip the check.
  }
}

// Check each component exists so failures are readable instead of cryptic.
async function preflight(names: string[]): Promise<void> {
  for (const name of names) {
    const url = REGISTRY_URL.replace("{name}", name)
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) }).catch(() => null)
    if (!res) fail(`could not reach the registry at ${url}. Check your connection.`)
    if (res.status === 404) {
      fail(`"${name}" was not found in the registry. Run \`m3-kit list\` to see what is available.`)
    }
    const type = res.headers.get("content-type") ?? ""
    if (!res.ok || !type.includes("json")) {
      fail(`the registry returned an unexpected response (HTTP ${res.status}) for "${name}".`)
    }
  }
}

const HELP = `m3-kit ${readVersion()}

Usage:
  m3-kit add <component...> [options]   Add Material 3 components to your project
  m3-kit list                           List available components

Options for add (passed through to shadcn):
  -y, --yes          skip confirmation prompts
  -o, --overwrite    overwrite existing files
  -c, --cwd <path>   project directory
  --dry-run          preview changes without writing files

Environment:
  M3_KIT_REGISTRY    override the registry URL template (must contain {name})
`

async function main(): Promise<number> {
  const [command, ...rest] = process.argv.slice(2)

  if (!command || command === "help" || command === "-h" || command === "--help") {
    console.log(HELP)
    return 0
  }
  if (command === "-v" || command === "--version") {
    console.log(readVersion())
    return 0
  }

  const cwd = getCwd(rest)

  if (command === "add") {
    const { names, flags } = splitArgs(rest)
    if (names.length === 0) {
      return fail("tell me which component to add, for example: m3-kit add button")
    }
    await ensureProject(cwd)
    checkTailwind(cwd)
    await preflight(names.filter((n) => !isExplicit(n)))
    return runShadcn(["add", ...names.map(toTarget), ...flags])
  }

  if (command === "list") {
    await ensureProject(cwd)
    return runShadcn(["search", NAMESPACE, "--cwd", cwd])
  }

  return fail(`unknown command "${command}". Run m3-kit --help.`)
}

main()
  .then((code) => process.exit(code))
  .catch((err) => fail(err instanceof Error ? err.message : String(err)))