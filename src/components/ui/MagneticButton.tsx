'use client'

import { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  'data-cursor'?: string
  type?: 'button' | 'submit'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  'data-cursor': dataCursor = 'hover',
  type = 'button',
}: MagneticButtonProps) {
  const ref = useMagnetic(0.45)

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`btn ${className}`}
        data-cursor={dataCursor}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      data-cursor={dataCursor}
    >
      {children}
    </button>
  )
}
