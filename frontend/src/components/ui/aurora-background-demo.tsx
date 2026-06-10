"use client"

import AuroraBackground, { AuroraBackgroundProps } from "@/components/ui/aurora-background"

export const AuroraBackgroundDemo = () => {
  const demoProps: AuroraBackgroundProps = {
    variant: "dark",
    gradientColors: [
      "var(--aurora-color1, rgba(37, 99, 235, 0.25))",
      "var(--aurora-color2, rgba(249, 115, 22, 0.2))",
    ],
    pulseDuration: 8,
    starCount: 80,
  }

  return (
    <AuroraBackground {...demoProps} className="px-4 py-8">
      <h1 className="bg-gradient-to-br from-gray-50 to-gray-400 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl">
        Aurora UI
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-300">
        A shimmering canvas of light to power your next interface.
      </p>
    </AuroraBackground>
  )
}

export default AuroraBackgroundDemo
