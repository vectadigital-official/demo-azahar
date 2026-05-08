'use client'

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'

interface TextRevealProps {
  children: string
  as?: TextTag
  className?: string
  delay?: number
  stagger?: number
  splitBy?: 'chars' | 'words' | 'lines'
  start?: string
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.025,
  splitBy = 'words',
  start = 'top 88%',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = new SplitType(el, { types: splitBy })
    const targets = splitBy === 'chars' ? split.chars : splitBy === 'lines' ? split.lines : split.words
    if (!targets?.length) return

    gsap.set(targets, { yPercent: 115, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          delay,
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [delay, stagger, splitBy, start])

  const Comp = Tag as 'p'
  return (
    <Comp ref={ref as React.RefObject<HTMLParagraphElement>} className={`overflow-hidden ${className}`}>
      {children}
    </Comp>
  )
}
