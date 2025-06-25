"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, Palette, Shield, Leaf, Waves, Mountain, Sunset, Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

const baseThemes = [
  { name: "light", icon: Sun, label: "Light", description: "Light mode" },
  { name: "dark", icon: Moon, label: "Dark", description: "Dark mode (default)" },
  { name: "system", icon: Monitor, label: "System", description: "Follow system" },
]

const colorThemes = [
  {
    name: "theme-navy",
    icon: Anchor,
    label: "Deep Navy",
    description: "Professional navy with enhanced depth",
    colors: ["#014F86", "#2C7DA0", "#468FAF", "#F6F6F7"]
  },
  {
    name: "theme-azure",
    icon: Waves,
    label: "Azure Sky",
    description: "Light and airy blue theme",
    colors: ["#61A5C2", "#A9D6E5", "#2A6F97", "#89C2D9"]
  },
  {
    name: "theme-steel",
    icon: Shield,
    label: "Steel Blue",
    description: "Industrial steel blue professional",
    colors: ["#468FAF", "#2A6F97", "#A9D6E5", "#013A63"]
  },
  {
    name: "theme-arctic",
    icon: Mountain,
    label: "Arctic Blue",
    description: "Cool arctic theme with crisp tones",
    colors: ["#89C2D9", "#A9D6E5", "#014F86", "#F6F6F7"]
  },
  {
    name: "theme-midnight",
    icon: Sunset,
    label: "Midnight Ocean",
    description: "Deep midnight blue with oceanic depth",
    colors: ["#2C7DA0", "#2A6F97", "#A9D6E5", "#012A4A"]
  },
]

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'base' | 'color'>('base')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const allThemes = [...baseThemes, ...colorThemes]
  const currentTheme = allThemes.find(t => t.name === theme) || baseThemes[1] // Default to dark
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden border-theme-hover bg-card/80 backdrop-blur-md hover:bg-card/90 hover-glow transition-all duration-300 focus-visible-ring"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <CurrentIcon className="h-4 w-4 text-primary" />
          <Palette className="h-3 w-3 text-muted-foreground" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Enhanced theme selector panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[220px] rounded-lg border-theme bg-card/95 backdrop-blur-md shadow-theme-lg"
            >
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                  Choose Theme
                </div>
                {baseThemes.map((themeOption) => {
                  const Icon = themeOption.icon
                  const isActive = theme === themeOption.name

                  return (
                    <motion.button
                      key={themeOption.name}
                      onClick={() => {
                        setTheme(themeOption.name)
                        setIsOpen(false)
                      }}
                      className="relative w-full flex items-center gap-3 px-3 py-3 text-sm rounded-lg transition-all duration-200 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none border border-transparent hover:border-primary/20 focus-visible-ring"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative">
                        <Icon className="h-4 w-4" />
                        {isActive && (
                          <motion.div
                            layoutId="activeTheme"
                            className="absolute -inset-1 rounded-full bg-primary/20"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                      <span className={isActive ? "text-primary font-medium" : "text-foreground"}>
                        {themeOption.label}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto h-2 w-2 rounded-full bg-primary"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
              
              {/* Enhanced blue palette preview */}
              <div className="border-t border-theme p-3">
                <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-3">
                  Blue Palette Preview
                </div>
                <div className="grid grid-cols-4 gap-2 px-2 mb-3">
                  <motion.div
                    className="h-6 w-6 rounded-full border-2 border-primary/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--primary))" }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    title="Primary Blue"
                  />
                  <motion.div
                    className="h-6 w-6 rounded-full border-2 border-secondary/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    title="Secondary Blue"
                  />
                  <motion.div
                    className="h-6 w-6 rounded-full border-2 border-accent/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--accent))" }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    title="Accent Blue"
                  />
                  <motion.div
                    className="h-6 w-6 rounded-full border-2 border-muted-foreground/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--muted))" }}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    title="Muted Blue"
                  />
                </div>

                {/* Blue gradient showcase */}
                <div className="px-2">
                  <div className="text-xs text-muted-foreground mb-2">Ocean Gradient</div>
                  <motion.div
                    className="h-4 rounded-full shadow-sm border border-border/50"
                    style={{
                      background: "linear-gradient(90deg, hsl(var(--blue-darkest)), hsl(var(--blue-medium)), hsl(var(--blue-air)), hsl(var(--blue-very-light)))"
                    }}
                    whileHover={{ scale: 1.02 }}
                    title="Blue Palette Gradient"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
