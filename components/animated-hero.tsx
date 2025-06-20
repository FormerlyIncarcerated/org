"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Users, Heart } from "lucide-react"
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
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <p className="text-sm text-muted-foreground">Empowering Second Chances</p>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-color-2">70 Million Americans Feel</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
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
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto">
            <Button size="lg" className="gap-4 w-full sm:w-auto bg-color-2 hover:bg-color-2/90 text-color-1" asChild>
              <Link href="/about">
                Learn More <Heart className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-4 w-full sm:w-auto border-color-4 text-color-4 hover:bg-color-4 hover:text-color-1" variant="outline" asChild>
              <Link href="/contact">
                Join Our Community <Users className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
