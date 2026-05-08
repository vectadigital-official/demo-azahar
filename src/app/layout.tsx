import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'block',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'block',
})

export const metadata: Metadata = {
  title: 'Clínica Dental Azahar — Precisión digital. Sonrisas perfectas.',
  description: 'Clínica dental de alta tecnología en Valencia. Invisalign Diamond, implantes digitales, estética dental de vanguardia.',
  openGraph: {
    title: 'Clínica Dental Azahar',
    description: 'Precisión digital. Sonrisas perfectas.',
    type: 'website',
    locale: 'es_ES',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
