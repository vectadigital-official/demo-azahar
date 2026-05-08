'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

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

const VISIBLE   = 3   // tarjetas visibles a la vez en desktop
const MAX_INDEX = TREATMENTS.length - VISIBLE  // 3
const INTERVAL  = 4500

export default function Treatments() {
  const trackRef    = useRef<HTMLDivElement>(null)
  const currentRef  = useRef(0)
  const animRef     = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const [current, setCurrent] = useState(0)

  /* ── Función de slide ── */
  const slideTo = (idx: number, resetTimer = true) => {
    const track = trackRef.current
    if (!track || animRef.current) return
    const clamped = Math.max(0, Math.min(idx, MAX_INDEX))

    animRef.current   = true
    currentRef.current = clamped
    setCurrent(clamped)

    const card  = track.firstElementChild as HTMLElement
    const cardW = card ? card.getBoundingClientRect().width : 420
    const gap   = 16

    gsap.to(track, {
      x: -(clamped * (cardW + gap)),
      duration: 0.75,
      ease: 'power3.inOut',
      onComplete: () => { animRef.current = false },
    })

    if (resetTimer) restartInterval()
  }

  /* ── Auto-avance ── */
  const restartInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const next = currentRef.current >= MAX_INDEX ? 0 : currentRef.current + 1
      slideTo(next, false)
    }, INTERVAL)
  }

  useEffect(() => {
    if (window.innerWidth < 1024) return
    restartInterval()
    return () => clearInterval(intervalRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="tratamientos" className="overflow-hidden">

      {/* ── MOBILE: carrusel táctil ── */}
      <div className="lg:hidden section-py">
        <div className="container mb-8">
          <span className="label text-accent">03 — TRATAMIENTOS</span>
        </div>
        <div
          className="flex gap-4 px-[var(--gutter)]"
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {TREATMENTS.map((t) => <TreatmentCard key={t.id} treatment={t} />)}
        </div>
      </div>

      {/* ── DESKTOP: carrusel con flechas ── */}
      <div className="hidden lg:block section-py">

        {/* Cabecera + controles */}
        <div className="container mb-10 flex justify-between items-center">
          <span className="label text-accent">03 — TRATAMIENTOS</span>

          <div className="flex items-center gap-6">
            {/* Contador */}
            <span className="label text-muted tabular-nums">
              <span className="text-accent">{String(current + 1).padStart(2, '0')}</span>
              {' / '}
              {String(TREATMENTS.length).padStart(2, '0')}
            </span>

            {/* Flechas */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => slideTo(current - 1)}
                disabled={current === 0}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                           text-muted hover:border-accent hover:text-accent
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-200"
                data-cursor="hover"
                aria-label="Anterior"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>

              <button
                onClick={() => slideTo(current + 1)}
                disabled={current === MAX_INDEX}
                className="w-11 h-11 rounded-full bg-accent text-bg flex items-center justify-center
                           hover:bg-transparent hover:text-accent border border-accent
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-200"
                data-cursor="hover"
                aria-label="Siguiente"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Track de tarjetas */}
        <div className="overflow-hidden px-[var(--gutter)]">
          <div ref={trackRef} className="flex gap-4 will-change-transform">
            {TREATMENTS.map((t) => <TreatmentCard key={t.id} treatment={t} />)}
          </div>
        </div>

        {/* Dots de navegación */}
        <div className="container mt-8 flex items-center gap-3">
          {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              className={`h-px transition-all duration-300 ${
                i === current ? 'bg-accent w-10' : 'bg-white/20 w-6 hover:bg-white/40'
              }`}
              data-cursor="hover"
              aria-label={`Ir al tratamiento ${i + 1}`}
            />
          ))}
          {/* Barra de progreso del auto-avance */}
          <div className="flex-1 h-px bg-white/5 ml-4" />
        </div>
      </div>

    </section>
  )
}

/* ── Tarjeta de tratamiento ── */
function TreatmentCard({ treatment }: { treatment: typeof TREATMENTS[0] }) {
  return (
    <div
      className="flex-none flex flex-col border border-white/10 hover:border-accent/40
                 transition-all duration-500 group"
      style={{ width: 'clamp(280px, 30vw, 420px)', height: 'clamp(400px, 65vh, 560px)' }}
      data-cursor="view"
    >
      {/* Imagen */}
      <div className="flex-1 relative overflow-hidden">
        <img
          src={treatment.img}
          alt={treatment.name}
          className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-bg/10 to-transparent" />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent/20
                     group-hover:text-accent/40 transition-colors duration-500 select-none"
          style={{ fontSize: '7rem', lineHeight: 1 }}
        >
          {treatment.icon}
        </span>
        <span
          className="absolute top-4 right-5 text-white/8 group-hover:text-accent/20
                     transition-colors duration-500 tabular-nums select-none"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '5rem', lineHeight: 1 }}
        >
          {treatment.num}
        </span>
        <span className="absolute top-4 left-4 label text-accent bg-accent/10 border border-accent/20 px-3 py-1">
          {treatment.tag}
        </span>
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
