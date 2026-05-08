'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const TREATMENTS = [
  {
    id: 't01', num: '01', name: 'Invisalign', tag: 'DIAMOND PROVIDER',
    desc: 'Ortodoncia invisible con la tecnología más avanzada. Resultados predecibles desde el primer día.',
    duration: '6–18 meses', icon: '◈',
    img: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=700&q=90&auto=format&fit=crop&crop=center',
  },
  {
    id: 't02', num: '02', name: 'Implantes', tag: 'CARGA INMEDIATA',
    desc: 'Implantes de titanio guiados digitalmente. Protocolo de carga inmediata en 24h.',
    duration: '1 día', icon: '◉',
    img: '/images/treatments/implantes.jpg',
  },
  {
    id: 't03', num: '03', name: 'Diseño de Sonrisa', tag: 'DIGITAL SMILE DESIGN',
    desc: 'Planificación 100% digital. Previsualiza tu nueva sonrisa antes de comenzar el tratamiento.',
    duration: '2–4 semanas', icon: '◎',
    img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=700&q=90&auto=format&fit=crop&crop=entropy',
  },
  {
    id: 't04', num: '04', name: 'Blanqueamiento', tag: 'LED PROFESIONAL',
    desc: 'Sistema LED de última generación. Hasta 8 tonos más blanco en una sola sesión sin sensibilidad.',
    duration: '1 sesión', icon: '◇',
    img: '/images/treatments/blanqueamiento.jpg',
  },
  {
    id: 't05', num: '05', name: 'Periodoncia', tag: 'LÁSER DENTAL',
    desc: 'Tratamiento de encías con láser Er:YAG. Mínima invasión, recuperación acelerada.',
    duration: 'Personalizado', icon: '○',
    img: '/images/treatments/periodoncia.jpg',
  },
  {
    id: 't06', num: '06', name: 'Odontopediatría', tag: 'AMBIENTE AMIGABLE',
    desc: 'Cuidado dental especializado para los más pequeños. Técnicas no invasivas y ambiente diseñado para ellos.',
    duration: 'Desde 3 años', icon: '◐',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&q=90&auto=format&fit=crop&crop=faces,top&facepad=2',
  },
]

export default function Treatments() {
  const sectionRef     = useRef<HTMLElement>(null)
  const trackRef       = useRef<HTMLDivElement>(null)
  const triggerRef     = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    // En mobile no hay pin — el track usa scroll táctil nativo
    if (window.innerWidth < 1024) return

    const getDistance = () => track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) * 2

    const anim = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${getDistance()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`
          }
        },
      },
    })

    triggerRef.current = anim.scrollTrigger as ReturnType<typeof ScrollTrigger.create>

    return () => {
      triggerRef.current?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="tratamientos" className="overflow-hidden">

      {/* ── MOBILE: carrusel táctil ── */}
      <div className="lg:hidden section-py">
        <div className="container mb-8">
          <span className="label text-accent">03 — TRATAMIENTOS</span>
        </div>
        <div
          className="flex gap-4 px-[var(--gutter)]"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {TREATMENTS.map((t) => (
            <TreatmentCard key={t.id} treatment={t} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: scroll horizontal con GSAP (pin gestionado por GSAP, no CSS) ── */}
      <div className="hidden lg:flex lg:h-screen flex-col justify-center">
          <div className="container flex justify-between items-end mb-8 flex-shrink-0">
            <span className="label text-accent">03 — TRATAMIENTOS</span>
            <span className="label text-muted flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-muted" />
              ARRASTRA PARA EXPLORAR
              <span className="inline-block w-6 h-px bg-muted" />
            </span>
          </div>

          <div
            ref={trackRef}
            className="flex gap-4 px-[var(--gutter)] will-change-transform"
            data-cursor="drag"
          >
            {TREATMENTS.map((t) => (
              <TreatmentCard key={t.id} treatment={t} />
            ))}
          </div>

          <div className="container mt-8 flex-shrink-0">
            <div className="h-px bg-white/5 w-full">
              <div ref={progressBarRef} className="h-full bg-accent" style={{ width: '0%', transition: 'width 0.05s linear' }} />
            </div>
          </div>
      </div>

    </section>
  )
}

function TreatmentCard({ treatment }: { treatment: typeof TREATMENTS[0] }) {
  return (
    <div
      className="flex-none flex flex-col border border-white/10 hover:border-accent/40
                 transition-all duration-500 group"
      style={{ width: 'clamp(280px, 30vw, 420px)', height: 'clamp(400px, 65vh, 560px)' }}
      data-cursor="view"
    >
      {/* Image area */}
      <div className="flex-1 relative overflow-hidden">
        <img
          src={treatment.img}
          alt={treatment.name}
          className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-bg/10 to-transparent" />
        {/* Icon */}
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent/20
                     group-hover:text-accent/40 transition-colors duration-500 select-none"
          style={{ fontSize: '7rem', lineHeight: 1 }}
        >
          {treatment.icon}
        </span>

        {/* Number */}
        <span
          className="absolute top-4 right-5 text-white/8 group-hover:text-accent/20
                     transition-colors duration-500 tabular-nums select-none"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '5rem', lineHeight: 1 }}
        >
          {treatment.num}
        </span>

        {/* Tag */}
        <span className="absolute top-4 left-4 label text-accent bg-accent/10 border border-accent/20 px-3 py-1">
          {treatment.tag}
        </span>

        {/* Accent bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-700" />
      </div>

      {/* Info */}
      <div className="p-6 border-t border-white/5 flex flex-col gap-3">
        <h3
          className="heading text-text group-hover:text-accent transition-colors duration-300"
          style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
        >
          {treatment.name}
        </h3>
        <p className="body text-sm leading-relaxed">{treatment.desc}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="label text-muted">Duración: {treatment.duration}</span>
          <span className="label text-accent flex items-center gap-1">
            INFO
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
