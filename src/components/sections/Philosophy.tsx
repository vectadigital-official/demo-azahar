'use client'

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const STATEMENT = 'La diferencia entre una sonrisa buena y una perfecta es de 0,1 milímetros. Nosotros medimos esa diferencia.'

const VALUES = [
  { num: '01', title: 'Diagnóstico digital', desc: 'Escáner 3D intraoral, CBCT y fotografía facial en una sola visita.' },
  { num: '02', title: 'Planificación virtual', desc: 'Tu resultado final antes de empezar. Sin sorpresas, sin improvisaciones.' },
  { num: '03', title: 'Ejecución milimétrica', desc: 'Protocolos clínicos de precisión. El mismo resultado, cada vez.' },
]

export default function Philosophy() {
  const sectionRef   = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const dividerRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = statementRef.current
    if (!el) return

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = []
    const split = new SplitType(el, { types: 'words' })
    if (!split.words) return

    gsap.set(split.words, { opacity: 0.12 })

    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        end: 'bottom 30%',
        scrub: 1.5,
        onUpdate: (self) => {
          const total = split.words!.length
          const progress = self.progress
          split.words!.forEach((word, i) => {
            const wordProgress = Math.max(0, Math.min(1, (progress * total - i) / 2))
            gsap.set(word, { opacity: 0.12 + wordProgress * 0.88, color: wordProgress > 0.8 ? 'var(--accent)' : 'var(--text)' })
          })
        },
      })
    )

    if (dividerRef.current) {
      const anim = gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.4, ease: 'power4.out',
          scrollTrigger: { trigger: dividerRef.current, start: 'top 85%', once: true } }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    return () => {
      split.revert()
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="filosofia" className="section-py border-t border-white/5">
      <div className="container">
        {/* Label */}
        <div className="flex justify-between items-center mb-8 lg:mb-20">
          <span className="label text-accent">02 — FILOSOFÍA</span>
          <span className="label text-muted hidden lg:block">Tecnología al servicio de la precisión</span>
        </div>

        {/* Big statement */}
        <p
          ref={statementRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem, 4.5vw, 5.5rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            maxWidth: '14ch',
          }}
        >
          {STATEMENT}
        </p>

        <div ref={dividerRef} className="h-px bg-accent mt-10 mb-10 lg:mt-20 lg:mb-20" />

        {/* Values */}
        <div className="grid-12">
          {VALUES.map((v, i) => (
            <div
              key={v.num}
              className="col-span-12 lg:col-span-4 group relative"
            >
              <span className="label text-accent mb-4 block">{v.num}</span>
              <h3
                className="heading text-text mb-4 group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)' }}
              >
                {v.title}
              </h3>
              <p className="body">{v.desc}</p>
              {i < VALUES.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
