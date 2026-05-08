'use client'

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import { gsap } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import Marquee from '@/components/ui/Marquee'

const STATS = [
  { value: '+2.400', label: 'Pacientes',          num: 2400, fmt: (n: number) => `+${n.toLocaleString('es-ES')}` },
  { value: '15',     label: 'Años',               num: 15,   fmt: (n: number) => String(n) },
  { value: '98%',    label: 'Satisfacción',        num: 98,   fmt: (n: number) => `${n}%` },
  { value: '#1',     label: 'Invisalign Valencia', num: null, fmt: null },
]

export default function Hero() {
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const labelRef    = useRef<HTMLParagraphElement>(null)
  const descRef     = useRef<HTMLParagraphElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const statValRefs = useRef<HTMLParagraphElement[]>([])
  const ctaRef      = useRef<HTMLDivElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    const split = new SplitType(title, { types: 'chars' })

    gsap.set(split.chars,  { yPercent: 120, opacity: 0 })
    gsap.set(labelRef.current, { opacity: 0, y: 16 })
    gsap.set(descRef.current,  { opacity: 0, y: 20 })
    gsap.set(ctaRef.current,   { opacity: 0, y: 20 })
    gsap.set(statsRef.current, { opacity: 0, y: 16 })
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.7, rotate: 12 })
    gsap.set(imgRef.current,   { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 })
    gsap.set(overlayRef.current, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(split.chars, {
        yPercent: 0, opacity: 1,
        duration: 1.0, ease: 'power4.out',
        stagger: { amount: 0.35 },
      })
      .to(imgRef.current,     { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=0.75')
      .to(overlayRef.current, { opacity: 1, duration: 0.6 }, '-=0.4')
      .to(labelRef.current,   { opacity: 1, y: 0, duration: 0.55 }, '-=0.5')
      .to(descRef.current,    { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(statsRef.current,   { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
      .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
      .to(badgeRef.current,   { opacity: 1, scale: 1, rotate: -5, duration: 0.7, ease: 'back.out(1.8)' }, '-=0.4')

    // Contadores animados para las estadísticas
    STATS.forEach((stat, i) => {
      if (!stat.num || !stat.fmt || !statValRefs.current[i]) return
      const el  = statValRefs.current[i]
      const obj = { val: 0 }
      tl.to(obj, {
        val: stat.num,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = stat.fmt!(Math.round(obj.val)) },
      }, '-=1.6')
    })

    /* Parallax */
    const parallax = gsap.to(imgRef.current, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    })

    return () => {
      split.revert()
      parallax.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 overflow-hidden">

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Ambient glow top-right */}
      <div
        className="absolute -top-32 right-0 w-[50vw] h-[70vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.07) 0%, transparent 65%)' }}
      />

      {/* ── Main content ── */}
      <div className="container flex-1 flex flex-col gap-0 mt-8 relative">

        {/* Top label row */}
        <div className="flex justify-between items-center mb-6">
          <p ref={labelRef} className="label text-accent" style={{ opacity: 0 }}>
            — Tecnología de vanguardia · Valencia
          </p>
          <Clock />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 flex-1 pb-10">

          {/* Left: title + desc + cta */}
          <div className="flex flex-col justify-between lg:w-[48%] flex-shrink-0">

            {/* Title — nowrap prevents the R from orphaning */}
            <h1
              ref={titleRef}
              className="overflow-hidden leading-none whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                letterSpacing: '-0.045em',
                lineHeight: 0.88,
              }}
            >
              AZAHAR
            </h1>

            <div className="mt-auto pt-12">
              <p
                ref={descRef}
                className="body-lg text-muted max-w-sm leading-relaxed"
                style={{ opacity: 0 }}
              >
                Precisión digital. Sonrisas perfectas.
                La clínica dental donde la tecnología
                y el arte se encuentran.
              </p>

              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-10" style={{ opacity: 0 }}>
                <MagneticButton className="btn-accent" data-cursor="book" href="#contacto">
                  Consulta gratuita
                  <Arrow />
                </MagneticButton>
                <MagneticButton className="btn-outline" data-cursor="hover" href="#tratamientos">
                  Tratamientos
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div
            ref={imgRef}
            className="relative flex-1 overflow-hidden min-h-[360px] lg:min-h-0"
            style={{ opacity: 0 }}
            data-cursor="view"
          >
            <img
              src="/images/hero/hero.jpg"
              alt="Dentista Clínica Dental Azahar"
              className="w-full h-full object-cover object-center"
            />

            {/* Overlay desktop: fusiona la foto (derecha) con el fondo oscuro */}
            <div
              ref={overlayRef}
              className="absolute inset-0 pointer-events-none hidden lg:block"
              style={{
                background: 'linear-gradient(to right, var(--bg) 0%, rgba(11,22,40,0.55) 50%, rgba(11,22,40,0.15) 100%), linear-gradient(to top, var(--bg) 0%, transparent 35%)',
                opacity: 0,
              }}
            />
            {/* Overlay mobile: oscurece la parte superior para que la foto no choque con el texto */}
            <div
              className="absolute inset-0 pointer-events-none lg:hidden"
              style={{ background: 'linear-gradient(to bottom, var(--bg) 0%, rgba(11,22,40,0.4) 40%, transparent 70%)' }}
            />

            {/* Corner marks */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent/50" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/50" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent/50" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent/50" />

            {/* Badge */}
            <div
              ref={badgeRef}
              className="absolute top-5 right-5 bg-accent text-bg label px-4 py-2"
              style={{ opacity: 0, fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              DIAMOND PROVIDER · INVISALIGN
            </div>

            {/* Bottom stat overlay */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
              <span className="label text-text/80">NUEVA CITA DISPONIBLE — LLÁMANOS HOY</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        ref={statsRef}
        className="container grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border-t border-white/5"
        style={{ opacity: 0 }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="bg-bg px-6 py-5">
            <p
              ref={(el) => { if (el) statValRefs.current[i] = el }}
              className="text-accent tabular-nums mb-1"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', letterSpacing: '-0.03em' }}
            >
              {s.value}
            </p>
            <p className="label text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Marquee ── */}
      <Marquee
        items={['Invisalign Diamond', 'Implantes digitales', 'Escáner 3D intraoral', 'Blanqueamiento LED', 'Ortodoncia lingual', 'Diseño de sonrisa']}
        speed={32}
      />
    </section>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function Clock() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      const now = new Date()
      ref.current.textContent =
        now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' CET'
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return <span ref={ref} className="label text-muted tabular-nums hidden md:block" />
}
