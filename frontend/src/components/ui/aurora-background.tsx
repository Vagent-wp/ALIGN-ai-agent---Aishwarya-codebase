"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface AuroraBackgroundProps {
  /** Extra wrapper classes */
  className?: string
  /** Content to render on top of the background */
  children?: React.ReactNode
  /** Number of “star” points */
  starCount?: number
  /** Two CSS-variable backed colors for the radial overlays */
  gradientColors?: [string, string]
  /** Pulse animation duration in seconds */
  pulseDuration?: number
  /** ARIA label for the animated background */
  ariaLabel?: string
  /** When true, sizes to parent container (hero). When false, covers viewport. */
  contained?: boolean
  /** `hero` = soft orange/blue on light canvas; `dark` = full-screen demo */
  variant?: "hero" | "dark"
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = "",
  children,
  starCount = 50,
  gradientColors = [
    "var(--aurora-color1, rgba(37, 99, 235, 0.18))",
    "var(--aurora-color2, rgba(249, 115, 22, 0.14))",
  ],
  pulseDuration = 10,
  ariaLabel = "Animated aurora background",
  contained = false,
  variant = "hero",
}) => {
  const [colorA, colorB] = gradientColors
  const isHero = variant === "hero"
  const effectiveStarCount = isHero ? Math.min(starCount, 35) : starCount

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        contained ? "absolute inset-0" : "h-screen w-screen",
        isHero ? "bg-transparent text-[var(--color-carbon-ink)]" : "bg-black text-slate-50",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className={cn("absolute inset-0", isHero ? "opacity-35" : "opacity-50")}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${colorA} 0%, transparent 70%),
              radial-gradient(circle at 80% 70%, ${colorB} 0%, transparent 70%)
            `,
            backgroundSize: "100% 100%",
            animation: `aurora-pulse ${pulseDuration}s infinite`,
          }}
        />

        <motion.div
          className={cn(
            "absolute inset-0",
            isHero ? "mix-blend-normal" : "mix-blend-screen",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className={cn(
              "absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full blur-3xl filter",
              isHero ? "bg-[var(--color-align-blue)] opacity-25" : "bg-blue-500 opacity-40",
            )}
            animate={{
              x: [-50, 50, -50],
              y: [-20, 20, -20],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn(
              "absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full blur-3xl filter",
              isHero ? "bg-[var(--color-align-orange)] opacity-20" : "bg-orange-500 opacity-40",
            )}
            animate={{
              x: [50, -50, 50],
              y: [20, -20, 20],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn(
              "absolute left-1/3 top-1/3 h-1/3 w-1/3 rounded-full blur-3xl filter",
              isHero ? "bg-[var(--color-ice-blue)] opacity-50" : "bg-indigo-700 opacity-30",
            )}
            animate={{
              x: [20, -20, 20],
              y: [-30, 30, -30],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {Array.from({ length: effectiveStarCount }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute h-0.5 w-0.5 rounded-full",
              isHero ? "bg-[var(--color-cobalt-spark)]" : "bg-white",
            )}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, Math.random() * (isHero ? 0.35 : 0.8), 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  )
}

export default AuroraBackground
