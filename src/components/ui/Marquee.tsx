'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  separator?: string
}

export default function Marquee({
  items,
  speed = 35,
  direction = 'left',
  className = '',
  separator = '◆',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const width = track.scrollWidth / 2
    const dur = width / speed

    gsap.fromTo(
      track,
      { x: direction === 'left' ? 0 : -width },
      { x: direction === 'left' ? -width : 0, duration: dur, ease: 'none', repeat: -1 }
    )
  }, [speed, direction])

  const full = [...items, ...items]

  return (
    <div className={`overflow-hidden border-y border-white/5 py-3 ${className}`}>
      <div ref={trackRef} className="flex gap-0 whitespace-nowrap will-change-transform">
        {full.map((item, i) => (
          <span key={i} className="label text-text-muted flex items-center gap-5 px-5">
            {item}
            <span className="text-accent text-[6px]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
