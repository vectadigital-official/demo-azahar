import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.6,
  })

  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  })
}

export { gsap, ScrollTrigger, Draggable }
