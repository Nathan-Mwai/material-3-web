import type { Metadata } from "next"
import { ButtonPlayground } from "@/app/button-playground"

export const metadata: Metadata = {
  title: "Button playground · Material 3 Web",
}

export default function ButtonPage() {
  // The playground shows the component as installed, so it opts out of the site palette
  return (
    <div className="m3-stage flex flex-1 flex-col bg-m3-surface">
      <ButtonPlayground />
    </div>
  )
}
