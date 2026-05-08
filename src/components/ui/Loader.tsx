'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount]   = useState(0)
  const wrapRef             = useRef<HTMLDivElement>(null)
  const curtainLeftRef      = useRef<HTMLDivElement>(null)
  const curtainRightRef     = useRef<HTMLDivElement>(null)
  const logoRef             = useRef<HTMLDivElement>(null)
  const countRef            = useRef<HTMLSpanElement>(null)
  const barRef              = useRef<HTMLDivElement>(null)
  const finishedRef         = useRef(false)

  useEffect(() => {
    const images = Array.from(document.images)
    let settled  = 0
    const total  = Math.max(images.length, 1)

    const onSettle = () => {
      settled++
      setCount(Math.round((settled / total) * 100))
      if (settled >= total) finish()
    }

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
      if (img.complete || img.naturalWidth > 0) onSettle()
      else {
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

    // Ocultar contador y barra
    tl.to(countRef.current, { opacity: 0, y: -30, duration: 0.45, ease: 'power3.in' })
      .to(barRef.current,   { opacity: 0, duration: 0.3 }, '-=0.2')

    // Logo aparece con escala dramática
      .to(logoRef.current,  {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, ease: 'power3.out',
        }, '-=0.1')
      .to(logoRef.current,  {
          scale: 1.08, opacity: 0,
          duration: 0.4, ease: 'power2.in',
        }, '+=0.4')

    // Split: las dos cortinas se separan en horizontal
      .to([curtainLeftRef.current, curtainRightRef.current], {
          xPercent: (i) => i === 0 ? -100 : 100,
          duration: 1.15,
          ease: 'power4.inOut',
          stagger: 0,
        }, '-=0.2')
      .set(wrapRef.current, { display: 'none' })
  }

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9990] bg-bg flex flex-col items-center justify-end pb-16 overflow-hidden"
    >
      {/* Dos cortinas que se separan */}
      <div ref={curtainLeftRef}  className="absolute top-0 left-0  w-1/2 h-full bg-bg z-10" />
      <div ref={curtainRightRef} className="absolute top-0 right-0 w-1/2 h-full bg-bg z-10" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Logo central */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
        style={{ transform: 'translateY(1.5rem) scale(0.96)' }}
      >
        <span className="label text-accent mb-3 tracking-[0.3em]">CLÍNICA DENTAL</span>
        <span className="display text-text" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
          AZAHAR
        </span>
        <div className="mt-6 h-px w-24 bg-accent origin-left" style={{ transform: 'scaleX(0)', animation: 'lineGrow 0.6s 0.1s ease forwards' }} />
      </div>

      {/* Contador */}
      <div className="relative z-20 w-full container">
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
        <div className="h-px bg-white/10 w-full overflow-hidden">
          <div ref={barRef} className="h-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
