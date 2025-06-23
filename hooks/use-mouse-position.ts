"use client"

import { useState, useEffect, RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
  elementX: number
  elementY: number
}

export function useMousePosition(elementRef?: RefObject<HTMLElement>) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition: MousePosition = {
        x: e.clientX,
        y: e.clientY,
        elementX: 0,
        elementY: 0,
      }

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect()
        newPosition.elementX = e.clientX - rect.left
        newPosition.elementY = e.clientY - rect.top
      }

      setMousePosition(newPosition)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [elementRef])

  return mousePosition
}
