'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const MEMBERS = [
  {
    name: 'Dra. María Azahar',
    role: 'Directora · Estética Dental',
    bio: 'Especialista en diseño de sonrisa digital. Formación en NYU y Berlín. 15 años transformando sonrisas en Valencia.',
    credentials: ['NYU College of Dentistry', 'DSD Certified', 'Invisalign Diamond'],
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=90&auto=format&fit=crop&crop=faces,top&facepad=2.5',
  },
  {
    name: 'Dr. Pablo Torres',
    role: 'Cirugía e Implantología',
    bio: 'Pionero en implantología guiada digitalmente en España. Más de 3.000 implantes colocados con protocolo digital.',
    credentials: ['MIR Cirugía Maxilofacial', 'Nobel Biocare Expert', 'SECOM'],
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=90&auto=format&fit=crop&crop=faces,top&facepad=2.5',
  },
  {
    name: 'Dra. Carmen Vega',
    role: 'Ortodoncia · Invisalign',
    bio: 'Ortodoncista de referencia en tratamientos de alineación invisible. Certificada como Diamond Provider de Invisalign.',
    credentials: ['Máster Ortodoncia UCM', 'Invisalign Diamond', 'SEDO'],
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=90&auto=format&fit=crop&crop=faces,top&facepad=2.5',
  },
]

export default function Team() {
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = []

    cardsRef.current.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 60 })
      triggers.push(
        ScrollTrigger.create({
          trigger: card,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1, y: 0,
              duration: 0.8, ease: 'power3.out',
              delay: i * 0.12,
            })
          },
        })
      )
    })

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <section id="equipo" className="section-py border-t border-white/5">
      <div className="container">
        <div className="flex justify-between items-end mb-20">
          <span className="label text-accent">05 — EQUIPO</span>
          <span className="label text-muted hidden lg:block">Especialistas, no generalistas</span>
        </div>

        <div className="grid-12 gap-y-8">
          {MEMBERS.map((m, i) => (
            <div
              key={m.name}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className="col-span-12 lg:col-span-4 group border border-white/8 hover:border-accent/30
                         transition-all duration-500 flex flex-col"
              data-cursor="view"
            >
              {/* Photo — replace with real team photos */}
              <div
                className="relative overflow-hidden"
                style={{ height: 'clamp(280px, 38vh, 420px)' }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover object-top lg:grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
              </div>

              {/* Info */}
              <div className="p-7 flex-1 flex flex-col gap-4">
                <div>
                  <h3 className="heading text-text" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
                    {m.name}
                  </h3>
                  <p className="label text-accent mt-1">{m.role}</p>
                </div>
                <p className="body text-sm flex-1">{m.bio}</p>
                <ul className="flex flex-col gap-1.5 mt-2">
                  {m.credentials.map((c) => (
                    <li key={c} className="label text-muted flex items-center gap-2">
                      <span className="text-accent text-[8px]">◆</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
