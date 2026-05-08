'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import Marquee from '@/components/ui/Marquee'

const SCHEDULE = [
  { day: 'Lunes – Viernes', hours: '09:00 – 21:00' },
  { day: 'Sábados', hours: '09:00 – 14:00' },
  { day: 'Urgencias', hours: '24h · WhatsApp' },
]

export default function Footer() {
  const bigTextRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null)

  useEffect(() => {
    const el = bigTextRef.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 60 })
    triggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
    })

    return () => triggerRef.current?.kill()
  }, [])

  return (
    <footer id="contacto" className="border-t border-white/5 pt-12 lg:pt-24 pb-8 relative overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="container relative">

        {/* CTA block */}
        <div className="grid-12 mb-12 lg:mb-24">
          <div className="col-span-12 lg:col-span-7">
            <span className="label text-accent mb-6 block">¿LISTO PARA EMPEZAR?</span>
            <h2
              className="heading text-text mb-8"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Tu primera consulta
              es <span className="text-accent">gratuita</span>.
              Sin compromiso.
            </h2>
            <div className="flex flex-wrap gap-4">
              <MagneticButton className="btn-accent" data-cursor="book" href="tel:+34963000000">
                Llamar ahora
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.19 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </MagneticButton>
              <MagneticButton className="btn-outline" data-cursor="hover" href="https://wa.me/34963000000">
                WhatsApp
              </MagneticButton>
            </div>
          </div>

          {/* Schedule */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-4 mt-12 lg:mt-0">
            <span className="label text-muted">HORARIO</span>
            {SCHEDULE.map((s) => (
              <div key={s.day} className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="label text-muted">{s.day}</span>
                <span className="label text-text">{s.hours}</span>
              </div>
            ))}
            <div className="mt-4">
              <span className="label text-muted block mb-1">DIRECCIÓN</span>
              <p className="body text-sm">C/ Gran Vía, 42 · Valencia · 46005</p>
            </div>
          </div>
        </div>

        {/* Big type */}
        <div ref={bigTextRef} className="overflow-hidden border-t border-white/5 pt-8">
          <span
            className="block text-white/5 select-none leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(5rem, 20vw, 22rem)', letterSpacing: '-0.04em' }}
          >
            AZAHAR
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8 pt-6 border-t border-white/5">
          <span className="label text-muted">© {new Date().getFullYear()} Clínica Dental Azahar · Valencia</span>
          <div className="flex gap-6">
            {['Aviso legal', 'Privacidad', 'Cookies'].map(link => (
              <a key={link} href="#" className="label text-muted hover:text-accent transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
          <span className="label text-muted hidden lg:block">
            Colegio nº 46-03782 · ICOEV
          </span>
        </div>
      </div>
    </footer>
  )
}
