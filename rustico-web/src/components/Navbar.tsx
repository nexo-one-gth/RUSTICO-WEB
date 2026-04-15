'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CATEGORY_LABELS } from '@/lib/products'
import LogoAnimated from './LogoAnimated'

const NAV_LINKS = [
  { label: 'Aparadores', href: '#aparadores' },
  { label: 'Muebles TV', href: '#muebles-tv' },
  { label: 'Mesas', href: '#mesas-ratona' },
  { label: 'Cocina', href: '#cocina' },
  { label: 'Catálogo', href: '#catalogo' },
]

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491123677587'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rustico-warm border-b border-rustico-brown/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <LogoAnimated />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body font-medium text-[11px] text-rustico-brown tracking-brand-sm uppercase px-4 py-2 hover:text-rustico-dark transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA WhatsApp — siempre visible */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Vi%20el%20catálogo%20de%20Rústico%20y%20me%20interesa%20saber%20más`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-[10px] px-4 py-2 hidden sm:block"
          >
            WhatsApp
          </a>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <span className={`w-5 h-px bg-rustico-dark transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-px bg-rustico-dark transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-rustico-dark transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-rustico-warm border-t border-rustico-brown/20 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body font-medium text-[12px] text-rustico-brown tracking-brand-sm uppercase px-2 py-3 border-b border-rustico-brown/20 hover:text-rustico-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-center mt-3"
            >
              Escribir por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
