'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const countRef   = useRef<HTMLSpanElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const finishedRef = useRef(false)

  useEffect(() => {
    const images = Array.from(document.images)
    let settled = 0
    const total = Math.max(images.length, 1)

    const onSettle = () => {
      settled++
      setCount(Math.round((settled / total) * 100))
      if (settled >= total) finish()
    }

    // Safety timeout — never leave the user on a blank page
    const safetyTimer = setTimeout(() => {
      if (!finishedRef.current) finish()
    }, 5000)

    if (images.length === 0) {
      let fake = 0
      const id = setInterval(() => {
        fake += Math.random() * 14
        if (fake >= 100) { clearInterval(id); setCount(100); finish() }
        else setCount(Math.min(Math.floor(fake), 99))
      }, 70)
      return () => { clearInterval(id); clearTimeout(safetyTimer) }
    }

    images.forEach((img) => {
      if (img.complete || img.naturalWidth > 0) {
        onSettle()
      } else {
        img.addEventListener('load',  onSettle, { once: true })
        img.addEventListener('error', onSettle, { once: true })
      }
    })

    return () => clearTimeout(safetyTimer)
  }, [])

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { scaleX: count / 100, ease: 'power2.out', duration: 0.3 })
    }
  }, [count])

  function finish() {
    if (finishedRef.current) return
    finishedRef.current = true

    const tl = gsap.timeline({ onComplete })
    tl.to(countRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power3.in' })
      .to(barRef.current,   { opacity: 0, duration: 0.3 }, '-=0.2')
      .to(logoRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.1')
      .to(logoRef.current,  { opacity: 0, duration: 0.3 }, '+=0.5')
      .to(curtainRef.current, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, '-=0.1')
      .set(wrapRef.current, { display: 'none' })
  }

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9990] bg-bg flex flex-col items-center justify-end pb-16 overflow-hidden"
    >
      <div ref={curtainRef} className="absolute inset-0 bg-bg" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Azahar logo mid-transition */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-6"
      >
        <span className="label text-accent mb-3">CLÍNICA DENTAL</span>
        <span className="display text-text" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
          AZAHAR
        </span>
      </div>

      {/* Counter */}
      <div className="relative z-10 w-full container">
        <div className="flex items-end justify-between mb-4">
          <span className="label text-text-muted">INICIANDO SISTEMA</span>
          <span
            ref={countRef}
            className="tabular-nums text-accent"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(5rem, 15vw, 14rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
          >
            {String(count).padStart(2, '0')}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-px bg-white/10 w-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  )
}
