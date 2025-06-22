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
    label: "Professional Navy",
    description: "Deep blue professional theme",
    colors: ["#003366", "#4d79a4", "#d4a574", "#f0f2f5"]
  },
  {
    name: "theme-earth",
    icon: Mountain,
    label: "Warm Earth",
    description: "Natural earth tones",
    colors: ["#3d2914", "#8b4513", "#87ceeb", "#f5f5dc"]
  },
  {
    name: "theme-purple",
    icon: Shield,
    label: "Modern Purple",
    description: "Professional purple theme",
    colors: ["#4a148c", "#7b1fa2", "#ffd54f", "#f3e5f5"]
  },
  {
    name: "theme-forest",
    icon: Leaf,
    label: "Forest Green",
    description: "Deep forest theme",
    colors: ["#1b5e20", "#4caf50", "#ff8a65", "#e8f5e8"]
  },
  {
    name: "theme-sunset",
    icon: Sunset,
    label: "Sunset",
    description: "Warm sunset theme",
    colors: ["#bf360c", "#ff7043", "#42a5f5", "#fff3e0"]
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
              
              {/* Enhanced color palette preview */}
              <div className="border-t border-theme p-3">
                <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-3">
                  Current Palette
                </div>
                <div className="flex gap-2 px-2">
                  <motion.div
                    className="h-7 w-7 rounded-full border-2 border-primary/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--primary))" }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    title="Primary Color"
                  />
                  <motion.div
                    className="h-7 w-7 rounded-full border-2 border-secondary/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--secondary))" }}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    title="Secondary Color"
                  />
                  <motion.div
                    className="h-7 w-7 rounded-full border-2 border-accent/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--accent))" }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    title="Accent Color"
                  />
                  <motion.div
                    className="h-7 w-7 rounded-full border-2 border-muted-foreground/30 shadow-sm"
                    style={{ backgroundColor: "hsl(var(--muted))" }}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    title="Muted Color"
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
