'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'book'

const LABELS: Record<CursorState, string> = {
  default: '',
  hover:   '',
  view:    'VER',
  drag:    'DRAG',
  book:    'RESERVAR',
}

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const onMove = (e: MouseEvent) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4,  ease: 'power3.out' })
    }

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const label = (el.dataset.cursor as CursorState) || 'hover'
      setState(label)
      const scale = label === 'book' ? 3.5 : label === 'view' ? 3 : 2
      gsap.to(ring, { scale, duration: 0.4, ease: 'power3.out' })
      gsap.to(dot,  { scale: 0, duration: 0.3 })
    }

    const onLeave = () => {
      setState('default')
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'power3.out' })
      gsap.to(dot,  { scale: 1, duration: 0.3 })
    }

    document.addEventListener('mousemove', onMove)

    const observe = () => {
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    observe()
    const observer = new MutationObserver(observe)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-accent"
        style={{ mixBlendMode: 'normal' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-10 h-10 rounded-full
                   border border-accent flex items-center justify-center"
        style={{ mixBlendMode: 'normal' }}
      >
        {LABELS[state] && (
          <span className="label text-accent text-[7px] whitespace-nowrap">{LABELS[state]}</span>
        )}
      </div>
    </>
  )
}
