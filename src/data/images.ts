// Rutas tipadas de todos los assets del proyecto
// Actualizar cuando se añadan o renombren imágenes

const UNSPLASH = 'https://images.unsplash.com/photo-'
const Q = '?auto=format&fit=crop&q=90'

export const images = {
  hero: {
    main: '/images/hero/hero.jpg',
  },

  treatments: {
    invisalign:    `${UNSPLASH}1606265752439-1f18756aa5fc${Q}&w=700&crop=center`,
    implantes:     '/images/treatments/implantes.jpg',
    sonrisa:       `${UNSPLASH}1606811971618-4486d14f3f99${Q}&w=700&crop=entropy`,
    blanqueamiento:'/images/treatments/blanqueamiento.jpg',
    periodoncia:   '/images/treatments/periodoncia.jpg',
    pediatria:     `${UNSPLASH}1629909613654-28e377c37b09${Q}&w=700&crop=faces,top&facepad=2`,
  },

  team: {
    maria:  `${UNSPLASH}1573496359142-b8d87734a5a2${Q}&w=700&crop=faces,top&facepad=2.5`,
    pablo:  `${UNSPLASH}1560250097-0b93528c311a${Q}&w=700&crop=faces,top&facepad=2.5`,
    carmen: `${UNSPLASH}1594824476967-48c8b964273f${Q}&w=700&crop=faces,top&facepad=2.5`,
  },

  gallery: {
    blanqueamiento: '/images/gallery/blanqueamiento.jpg',
    sonrisa:   `${UNSPLASH}1494790108377-be9c29b29330${Q}&w=800&crop=faces,top&facepad=3`,
    implantes: `${UNSPLASH}1507003211169-0a1dd7228f2d${Q}&w=700&crop=faces,top&facepad=3`,
    ortodoncia:`${UNSPLASH}1489424731084-a5d8b219a5bb${Q}&w=700&crop=faces,top&facepad=3`,
    invisalign:`${UNSPLASH}1524504388940-b1c1722653e1${Q}&w=800&crop=faces,top&facepad=3`,
  },
} as const

export type ImageKey = keyof typeof images
