'use client'

import { useEffect, useRef, useState, forwardRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const CASES = [
  {
    id: 'c01', label: 'Blanqueamiento',  badge: 'ANTES / DESPUÉS',
    span: 'lg:col-span-5 lg:row-span-2',
    img: '/images/gallery/blanqueamiento.jpg',
  },
  {
    id: 'c02', label: 'Diseño de Sonrisa', badge: 'CASO REAL',
    span: 'lg:col-span-4',
    img: '/images/gallery/diseno-sonrisa.jpg',
  },
  {
    id: 'c03', label: 'Implantes', badge: 'RESULTADO',
    span: 'lg:col-span-3',
    img: '/images/gallery/implantes.jpg',
  },
  {
    id: 'c04', label: 'Ortodoncia', badge: 'CASO REAL',
    span: 'lg:col-span-3',
    img: '/images/gallery/ortodoncia.jpg',
  },
  {
    id: 'c05', label: 'Invisalign', badge: 'RESULTADO',
    span: 'lg:col-span-4',
    img: '/images/gallery/invisalign.jpg',
  },
]

export default function Gallery() {
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = []

    itemsRef.current.forEach((el, i) => {
      gsap.set(el, { opacity: 0, scale: 0.96, y: 30 })
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1, scale: 1, y: 0,
              duration: 0.8, ease: 'power3.out',
              delay: (i % 3) * 0.1,
            })
          },
        })
      )
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <section id="resultados" className="section-py border-t border-white/5">
      <div className="container">
        <div className="flex justify-between items-end mb-14">
          <span className="label text-accent">07 — RESULTADOS</span>
          <span className="label text-muted hidden lg:block">Casos reales. Sin filtros.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 lg:auto-rows-[230px]">
          {CASES.map((c, i) => (
            <GalleryItem
              key={c.id}
              label={c.label}
              badge={c.badge}
              span={c.span}
              img={c.img}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
            />
          ))}
        </div>

        <p className="label text-muted mt-8 text-center">
          * Imágenes de pacientes con consentimiento informado.
        </p>
      </div>
    </section>
  )
}

const GalleryItem = forwardRef<
  HTMLDivElement,
  { label: string; badge: string; span: string; img: string }
>(({ label, badge, span, img }, ref) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`${span} h-64 lg:h-auto relative overflow-hidden group border border-white/8
                 hover:border-accent/30 transition-all duration-500`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
    >
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
      />

      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/30 group-hover:border-accent transition-colors duration-300" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/30 group-hover:border-accent transition-colors duration-300" />

      <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent">
        <div className={`transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <p className="label text-accent mb-1">{badge}</p>
          <p className="heading text-text" style={{ fontSize: '1.1rem' }}>{label}</p>
        </div>
      </div>
    </div>
  )
})
GalleryItem.displayName = 'GalleryItem'
