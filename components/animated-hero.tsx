"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => ["Isolated", "Overlooked", "Undervalued", "Marginalized", "Discouraged"], [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Enhanced theme-aware background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/8 via-transparent to-secondary/8" />

      {/* Subtle pattern overlay with better contrast */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.1) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="container mx-auto relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          {/* Enhanced badge with better contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="px-6 py-3 rounded-full border-theme bg-card/80 backdrop-blur-md shadow-theme hover-glow">
              <p className="text-sm font-semibold text-primary">✨ Empowering Second Chances</p>
            </div>
          </motion.div>

          {/* Main heading with improved gradient */}
          <motion.div
            className="flex gap-4 flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-gradient-readable font-bold text-shadow-theme-strong">
                70 Million Americans Feel
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-foreground"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              We're building a Web3-powered platform to break barriers, create opportunities, and empower formerly incarcerated individuals to rebuild their lives with dignity and purpose.
            </p>
          </motion.div>

          {/* Enhanced CTA buttons with better contrast and styling */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="gap-3 w-full sm:w-auto gradient-button text-primary-foreground border-theme-strong shadow-theme-lg hover-lift font-bold text-base px-8 py-4 focus-visible-ring"
              asChild
            >
              <Link href="/about">
                Learn More <Heart className="w-5 h-5 text-primary-foreground fill-current" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="gap-3 w-full sm:w-auto border-theme-strong text-primary hover:bg-primary/15 hover:border-primary backdrop-blur-md bg-card/80 shadow-theme hover-lift font-semibold text-base px-8 py-4 focus-visible-ring"
              variant="outline"
              asChild
            >
              <Link href="/survey">
                Take The Survey <Plus className="w-5 h-5 text-primary stroke-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
