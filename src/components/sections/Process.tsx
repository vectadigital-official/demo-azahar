'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const STEPS = [
  {
    num: '01',
    title: 'Consulta gratuita',
    desc: 'Primera visita sin compromiso. Estudiamos tu caso con escáner intraoral 3D y análisis facial completo.',
    detail: '30 min · Gratuita',
  },
  {
    num: '02',
    title: 'Diagnóstico digital',
    desc: 'Elaboramos tu plan de tratamiento personalizado. Ves el resultado final antes de comenzar.',
    detail: '48–72 horas',
  },
  {
    num: '03',
    title: 'Tratamiento',
    desc: 'Ejecución del plan con tecnología de precisión. Seguimiento semanal en los casos que lo requieren.',
    detail: 'Según tratamiento',
  },
  {
    num: '04',
    title: 'Revisión y garantía',
    desc: 'Seguimiento post-tratamiento incluido. Tu sonrisa perfecta es nuestra responsabilidad a largo plazo.',
    detail: 'Garantía 5 años',
  },
]

export default function Process() {
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = []

    stepsRef.current.forEach((step, i) => {
      const num    = step.querySelector('.step-num')
      const line   = step.querySelector('.step-line')
      const title  = step.querySelector('.step-title')
      const desc   = step.querySelector('.step-desc')
      const detail = step.querySelector('.step-detail')

      gsap.set([num, title, desc, detail], { opacity: 0, y: 50 })
      gsap.set(line, { scaleX: 0, transformOrigin: 'left' })

      triggers.push(
        ScrollTrigger.create({
          trigger: step,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ delay: i * 0.08 })
            tl.to(num,    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
              .to(line,   { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.2')
              .to(title,  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
              .to(desc,   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
              .to(detail, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
          },
        })
      )
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <section id="proceso" className="section-py border-t border-white/5">
      <div className="container">
        <div className="flex justify-between items-end mb-20">
          <span className="label text-accent">04 — PROCESO</span>
          <p className="label text-muted max-w-xs text-right hidden lg:block">
            De la primera visita al resultado final
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { if (el) stepsRef.current[i] = el }}
              className="grid-12 py-14 lg:py-20 group"
            >
              {/* Number */}
              <div className="col-span-12 lg:col-span-2 mb-4 lg:mb-0">
                <span
                  className="step-num tabular-nums text-white/15 group-hover:text-accent transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1 }}
                >
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <div className="col-span-12 lg:col-span-8 lg:col-start-4">
                <div className="step-line h-px bg-accent mb-7 w-full" />
                <h3
                  className="step-title heading mb-5 text-text"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}
                >
                  {step.title}
                </h3>
                <p className="step-desc body max-w-lg">{step.desc}</p>
              </div>

              {/* Detail */}
              <div className="col-span-12 lg:col-span-2 flex lg:justify-end lg:items-end">
                <span className="step-detail label text-accent">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
