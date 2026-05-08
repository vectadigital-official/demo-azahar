'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-px bg-white/5">
      <div
        className="h-full bg-accent origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
