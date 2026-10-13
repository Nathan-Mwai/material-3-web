import type { Metadata } from "next"
import { JetBrains_Mono, Noto_Serif_JP, Roboto } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

// Previews keep Roboto, the typeface the M3 type scale is specified in
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Material 3 Web: Material 3 components you copy into your React app",
  description:
    "A shadcn-style registry of Material 3 components for React and Tailwind CSS v4. In beta.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${notoSerifJP.variable} ${jetbrainsMono.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="sumi flex min-h-full flex-col selection:bg-seal selection:text-paper">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
