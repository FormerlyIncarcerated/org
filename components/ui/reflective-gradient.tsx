"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/use-mouse-position'

interface ReflectiveGradientProps {
  children: React.ReactNode
  className?: string
  gradientColor?: string
  intensity?: number
  size?: number
  disabled?: boolean
}

export function ReflectiveGradient({
  children,
  className = '',
  gradientColor = 'hsl(var(--secondary) / 0.1)',
  intensity = 0.3,
  size = 200,
  disabled = false
}: ReflectiveGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mousePosition = useMousePosition(containerRef)

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Reflective gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(${size}px circle at ${mousePosition.elementX}px ${mousePosition.elementY}px, ${gradientColor}, transparent 70%)`
            : 'transparent',
          opacity: isHovered ? intensity : 0,
        }}
        animate={{
          opacity: isHovered ? intensity : 0,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      />
      
      {/* Secondary shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(${size * 0.6}px circle at ${mousePosition.elementX}px ${mousePosition.elementY}px, hsl(var(--accent) / 0.05), transparent 50%)`
            : 'transparent',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
        }}
      />
    </div>
  )
}

// Specialized version for blockchain cards
export function BlockchainReflectiveGradient({
  children,
  className = '',
  themeColor = 'blue',
  disabled = false
}: {
  children: React.ReactNode
  className?: string
  themeColor?: string
  disabled?: boolean
}) {
  const colorMap: Record<string, string> = {
    blue: 'hsl(var(--primary) / 0.15)',
    purple: 'hsl(var(--accent) / 0.15)',
    cyan: 'hsl(var(--secondary) / 0.15)',
    indigo: 'hsl(var(--primary) / 0.15)',
    emerald: 'hsl(var(--secondary) / 0.15)',
    red: 'hsl(var(--accent) / 0.15)',
  }

  return (
    <ReflectiveGradient
      className={className}
      gradientColor={colorMap[themeColor] || colorMap.blue}
      intensity={0.4}
      size={250}
      disabled={disabled}
    >
      {children}
    </ReflectiveGradient>
  )
}
