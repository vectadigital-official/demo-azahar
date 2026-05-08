# AZAHAR — Clínica Dental Premium

Plantilla web tech-premium para clínicas dentales. Stack: Next.js 14 + TypeScript + Tailwind CSS + GSAP + Lenis + Framer Motion.

---

## Instalación

```bash
cd "Plantilla web/AZAHAR"
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Personalización rápida

### Color de acento
En `src/app/globals.css`:
```css
--accent: #00E5FF;  /* Cyan eléctrico (por defecto) */
--accent: #4ADE80;  /* Verde esmeralda */
--accent: #F59E0B;  /* Ámbar dorado */
```

### Nombre y datos de la clínica
Busca y reemplaza en todo el proyecto:
- `AZAHAR` → nombre de la clínica
- `963 000 000` → teléfono real
- `C/ Gran Vía, 42 · Valencia · 46005` → dirección real

### Imágenes
Reemplaza los placeholders `<div>` con `<Image>` de Next.js:
```tsx
import Image from 'next/image'

// En Hero.tsx, reemplaza el div de imagen por:
<Image
  src="/images/hero.avif"
  alt="Clínica Dental Azahar"
  fill
  priority
  className="object-cover"
/>
```
Coloca las imágenes en `/public/images/` en formato AVIF o WebP.

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx       — Root layout, fuentes, metadata
│   ├── page.tsx         — Página principal + nav
│   └── globals.css      — Tokens de diseño + reset
├── components/
│   ├── ui/
│   │   ├── Cursor.tsx           — Cursor personalizado reactivo
│   │   ├── Loader.tsx           — Loader con barra de progreso real
│   │   ├── Marquee.tsx          — Marquee infinito
│   │   ├── MagneticButton.tsx   — Botón con efecto magnético
│   │   ├── TextReveal.tsx       — Reveal de texto al scroll
│   │   └── ScrollProgress.tsx   — Barra de progreso global
│   └── sections/
│       ├── Hero.tsx             — Hero + stats + CTA
│       ├── Philosophy.tsx       — Word scrub + valores
│       ├── Treatments.tsx       — Scroll horizontal GSAP pin (real)
│       ├── Process.tsx          — 4 pasos con stagger
│       ├── Team.tsx             — Cards del equipo
│       ├── Testimonials.tsx     — Quotes animados
│       ├── Gallery.tsx          — Bento grid resultados
│       └── Footer.tsx           — Footer tipográfico + contacto
├── hooks/
│   ├── useLenis.ts              — Smooth scroll singleton
│   ├── useMagnetic.ts           — Efecto magnético
│   └── useScrollProgress.ts     — Progreso de scroll
└── lib/
    └── gsap.ts                  — Registro de plugins GSAP
```

---

## Dependencias clave

| Paquete | Versión | Para qué |
|---|---|---|
| `gsap` | ^3.12.5 | Scroll horizontal pin, word scrub, stagger |
| `lenis` | ^1.1.14 | Smooth scroll |
| `framer-motion` | ^11 | Micro-interacciones |
| `split-type` | ^0.3.4 | Split de texto para animaciones |

---

## Deploy

```bash
npm run build
npm run start
```

Compatible con Vercel, Netlify o cualquier host Node.js.

---

## Checklist antes de entregar al cliente

- [ ] Imágenes reales en AVIF/WebP en `/public/images/`
- [ ] Teléfono, dirección y horario actualizados
- [ ] Número de colegiado correcto (ICOEV)
- [ ] Links de WhatsApp configurados (`https://wa.me/34XXXXXXXXX`)
- [ ] Aviso legal, privacidad y cookies redactados
- [ ] Google Analytics / Meta Pixel añadido en layout.tsx
- [ ] Favicon en `/public/favicon.ico`
- [ ] `og:image` configurado en metadata
