"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

const themes = [
  { name: "light", icon: Sun, label: "Light" },
  { name: "dark", icon: Moon, label: "Dark" },
  { name: "system", icon: Monitor, label: "System" },
]

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = themes.find(t => t.name === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <CurrentIcon className="h-4 w-4" />
          <Palette className="h-3 w-3 opacity-60" />
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
            
            {/* Theme selector panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-lg border border-border/50 bg-card/95 backdrop-blur-md shadow-lg"
            >
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                  Choose Theme
                </div>
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon
                  const isActive = theme === themeOption.name
                  
                  return (
                    <motion.button
                      key={themeOption.name}
                      onClick={() => {
                        setTheme(themeOption.name)
                        setIsOpen(false)
                      }}
                      className="relative w-full flex items-center gap-3 px-2 py-2 text-sm rounded-md transition-colors hover:bg-accent/50 focus:bg-accent/50 focus:outline-none"
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
              
              {/* Color palette preview */}
              <div className="border-t border-border/50 p-2">
                <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-2">
                  Color Palette
                </div>
                <div className="flex gap-1 px-2">
                  <motion.div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: "#002447" }}
                    whileHover={{ scale: 1.1 }}
                    title="Deep Navy"
                  />
                  <motion.div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: "#53d3d1" }}
                    whileHover={{ scale: 1.1 }}
                    title="Bright Teal"
                  />
                  <motion.div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: "#fbeceb" }}
                    whileHover={{ scale: 1.1 }}
                    title="Soft Cream"
                  />
                  <motion.div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: "#feb249" }}
                    whileHover={{ scale: 1.1 }}
                    title="Vibrant Orange"
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
