'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const QUOTES = [
  {
    text: 'Después de años con complejos por mi sonrisa, Azahar cambió mi vida. El proceso con Invisalign fue exactamente como me explicaron desde el primer día. Sin sorpresas.',
    author: 'Laura M.',
    treatment: 'Invisalign · 14 meses',
    rating: 5,
  },
  {
    text: 'Me pusieron dos implantes en una sola mañana y ese mismo día comí sin molestias. La tecnología que tienen es de otro nivel. No lo hubiera creído si no lo vivo.',
    author: 'Javier R.',
    treatment: 'Implantes de carga inmediata',
    rating: 5,
  },
  {
    text: 'El diseño de sonrisa digital fue una experiencia increíble. Ver cómo quedaría mi resultado antes de empezar me dio una seguridad total. El resultado final es exactamente lo que vi.',
    author: 'Ana C.',
    treatment: 'Diseño de Sonrisa Digital',
    rating: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const contentRef   = useRef<HTMLDivElement>(null)
  const intervalRef  = useRef<ReturnType<typeof setInterval>>()
  const activeRef    = useRef(0)
  const animatingRef = useRef(false)

  activeRef.current = active

  const animateTransition = (idx: number) => {
    const el = contentRef.current
    if (!el || animatingRef.current) return
    animatingRef.current = true
    gsap.to(el, {
      opacity: 0, y: 20, duration: 0.35, ease: 'power3.in',
      onComplete: () => {
        setActive(idx)
        gsap.fromTo(el, { opacity: 0, y: -20 }, {
          opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
          onComplete: () => { animatingRef.current = false },
        })
      },
    })
  }

  const startInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      animateTransition((activeRef.current + 1) % QUOTES.length)
    }, 6000)
  }

  const goTo = (idx: number) => {
    startInterval()
    animateTransition(idx)
  }

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const q = QUOTES[active]

  return (
    <section id="testimonios" className="section-py border-t border-white/5 relative overflow-hidden">

      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.03) 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <div className="flex justify-between items-center mb-20">
          <span className="label text-accent">06 — TESTIMONIOS</span>
          <div className="flex items-center gap-3">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                data-cursor="hover"
                className={`h-px transition-all duration-300 ${i === active ? 'bg-accent w-10' : 'bg-white/20 w-6 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        <div ref={contentRef} className="max-w-5xl">
          {/* Stars */}
          <div className="flex gap-1 mb-10">
            {Array.from({ length: q.rating }).map((_, i) => (
              <span key={i} className="text-accent text-lg">★</span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(1.6rem, 3.5vw, 4rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--text)',
            }}
          >
            "{q.text}"
          </blockquote>

          {/* Author */}
          <div className="mt-12 flex items-center gap-6">
            <div className="w-12 h-px bg-accent" />
            <div>
              <p className="heading text-text" style={{ fontSize: '1.1rem' }}>{q.author}</p>
              <p className="label text-accent mt-1">{q.treatment}</p>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-16 label text-muted">
          <span className="text-accent tabular-nums">{String(active + 1).padStart(2, '0')}</span>
          {' / '}
          {String(QUOTES.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}
