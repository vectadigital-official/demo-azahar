/** @type {import('next').NextConfig} */
const nextConfig = {
  // Descomenta la línea siguiente para exportar HTML estático (subir a Hostinger)
  // output: 'export',

  images: {
    // Con output:'export' hay que desactivar la optimización de Next.js
    // unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
}

module.exports = nextConfig
