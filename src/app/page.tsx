'use client'

import { useState, useEffect, useRef } from 'react'
import { useLenis, getLenis } from '@/hooks/useLenis'
import { gsap } from '@/lib/gsap'
import Cursor from '@/components/ui/Cursor'
import Loader from '@/components/ui/Loader'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Hero from '@/components/sections/Hero'
import Philosophy from '@/components/sections/Philosophy'
import Treatments from '@/components/sections/Treatments'
import Process from '@/components/sections/Process'
import Team from '@/components/sections/Team'
import Testimonials from '@/components/sections/Testimonials'
import Gallery from '@/components/sections/Gallery'
import Footer from '@/components/sections/Footer'

const NAV_LINKS = [
  { label: 'Tratamientos', href: '#tratamientos' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef    = useRef<HTMLDivElement>(null)
  const skewRef    = useRef<HTMLDivElement>(null)
  const didOpenRef = useRef(false)
  useLenis()

  // Scroll skew — la página se inclina ligeramente según la velocidad del scroll
  useEffect(() => {
    if (!loaded) return
    const lenis = getLenis()
    if (!lenis || !skewRef.current) return
    const el = skewRef.current
    const handler = ({ velocity }: { velocity: number }) => {
      gsap.to(el, {
        skewY: velocity * 0.022,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    lenis.on('scroll', handler)
    return () => lenis.off('scroll', handler)
  }, [loaded])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    if (menuOpen) {
      didOpenRef.current = true
      gsap.set(menu, { display: 'flex' })
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power3.out' })
      gsap.fromTo(
        menu.querySelectorAll('.menu-link'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07, delay: 0.1 }
      )
      document.body.style.overflow = 'hidden'
    } else {
      if (!didOpenRef.current) return  // skip close animation on initial mount
      gsap.to(menu, {
        opacity: 0, duration: 0.3, ease: 'power3.in',
        onComplete: () => gsap.set(menu, { display: 'none' }),
      })
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <Cursor />
      <ScrollProgress />

      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[9980] backdrop-blur-xl flex-col items-center justify-center"
        style={{ display: 'none', background: 'rgba(11,22,40,0.97)' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <nav className="relative flex flex-col items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="menu-link display text-text hover:text-accent transition-colors duration-300"
              style={{ fontSize: 'clamp(2.2rem, 8vw, 4.5rem)' }}
              onClick={() => setMenuOpen(false)}
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+34963000000"
            className="menu-link btn btn-accent mt-6"
            onClick={() => setMenuOpen(false)}
            data-cursor="book"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse-slow" />
            Reservar cita · 963 000 000
          </a>
        </nav>
        <span className="absolute bottom-10 label text-muted/50">AZAHAR · CLÍNICA DENTAL</span>
      </div>

      <div
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ position: 'relative' }}
      >
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[var(--gutter)] py-5 transition-all duration-500 ${
            scrolled ? 'border-b border-white/5' : ''
          }`}
          style={{
            background: scrolled
              ? 'rgba(11,22,40,0.92)'
              : 'linear-gradient(to bottom, rgba(11,22,40,0.95) 0%, transparent 100%)',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          }}
        >
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none" data-cursor="hover">
            <span className="label text-accent text-[9px]">CLÍNICA DENTAL</span>
            <span
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.03em', color: 'var(--text)' }}
            >
              AZAHAR
            </span>
          </a>

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="label text-muted hover:text-text transition-colors duration-200 relative group"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+34963000000"
              data-cursor="book"
              className="btn btn-accent hidden md:flex items-center gap-2 py-2 px-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse-slow" />
              963 000 000
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[7px] w-8 h-6"
              onClick={() => setMenuOpen((o) => !o)}
              data-cursor="hover"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className={`block h-px w-6 bg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-6 bg-text transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-px w-6 bg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Sections — dentro del wrapper de scroll skew */}
        <div ref={skewRef} style={{ willChange: 'transform' }}>
          <Hero />
          <Philosophy />
          <Treatments />
          <Process />
          <Team />
          <Testimonials />
          <Gallery />
          <Footer />
        </div>
      </div>
    </>
  )
}
