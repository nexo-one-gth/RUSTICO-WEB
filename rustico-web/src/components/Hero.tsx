'use client'
import Link from 'next/link'
import Image from 'next/image'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491123677587'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">

      {/* Imagen de fondo */}
      <Image
        src="/imagenes/web.png"
        alt="Muebles rústicos Rústico GBA"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay degradado */}
      <div className="absolute inset-0 overlay-dark" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">

        {/* Headline */}
        <h1 className="font-display text-rustico-cream leading-none tracking-brand-xs mb-3">
          <span className="block text-[clamp(60px,12vw,120px)]">CADA PIEZA</span>
          <span className="block text-[clamp(60px,12vw,120px)] text-rustico-gold">
            TIENE UNA
          </span>
          <span className="block text-[clamp(60px,12vw,120px)]">HISTORIA</span>
        </h1>

        {/* Subtítulo */}
        <p className="font-body font-light text-rustico-sand text-base sm:text-lg tracking-wide max-w-lg mb-8 sm:mb-12">
          Muebles únicos en madera restaurada, hechos a mano en nuestro taller de Catán al mundo.
          Irrepetibles por definición.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#catalogo" className="btn-primary text-center">
            Ver Catálogo Completo
          </Link>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Vi%20el%20catálogo%20y%20me%20interesa%20una%20pieza`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-center"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-rustico-gold/40" />
        <div className="w-1 h-1 bg-rustico-gold rounded-full" />
      </div>
    </section>
  )
}
