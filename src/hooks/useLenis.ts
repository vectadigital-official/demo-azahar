'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'

let lenisInstance: Lenis | null = null

export function useLenis() {
  const rafRef = useRef<number>()

  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenisInstance?.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}
