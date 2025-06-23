"use client"

import { motion } from "framer-motion"

interface GradientBackgroundProps {
  variant?: "hero" | "section" | "subtle" | "vibrant"
  className?: string
  children?: React.ReactNode
}

export default function GradientBackground({
  variant = "section",
  className = "",
  children
}: GradientBackgroundProps) {
  const getGradientClasses = () => {
    switch (variant) {
      case "hero":
        return "bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 dark:from-primary/30 dark:via-secondary/25 dark:to-accent/15"
      case "vibrant":
        return "bg-gradient-conic from-primary/40 via-secondary/40 via-background/20 via-accent/40 to-primary/40 dark:from-primary/50 dark:via-secondary/50 dark:via-background/30 dark:via-accent/50 dark:to-primary/50"
      case "subtle":
        return "bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10"
      default: // section
        return "bg-gradient-radial from-secondary/15 via-transparent to-accent/15 dark:from-secondary/25 dark:via-transparent dark:to-accent/25"
    }
  }



  return (
    <div className={`relative ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 ${getGradientClasses()}`}
        animate={{
          opacity: variant === "hero" ? [0.8, 1, 0.8] : [0.5, 1, 0.5],
          scale: variant === "hero" ? [1, 1.05, 1] : [1, 1, 1],
          rotate: variant === "vibrant" ? [0, 360] : [0, 0, 0]
        }}
        transition={{
          duration: variant === "vibrant" ? 60 : variant === "hero" ? 10 : 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/5 dark:bg-background/10" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
