const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491123677587'

export default function Footer() {
  return (
    <footer className="bg-rustico-dark py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Brand */}
          <div>
            <span className="font-display text-rustico-gold text-4xl tracking-brand-xs block mb-2">
              RÚSTICO
            </span>
            <p className="font-body font-light text-rustico-sand text-xs max-w-xs leading-relaxed">
              Muebles únicos de madera restaurada, hechos a mano en nuestro taller de La Matanza.
              Entrega propia en todo el GBA.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-sand hover:text-rustico-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-sand hover:text-rustico-gold transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-sand hover:text-rustico-green transition-colors"
              >
                WhatsApp
              </a>
            </div>
            <p className="font-body font-light text-rustico-sand/40 text-[10px]">
              La Matanza · Morón · Gran Buenos Aires · Argentina
            </p>
          </div>
        </div>

        <div className="border-t border-rustico-brown/30 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body font-light text-rustico-sand/40 text-[10px]">
            © {new Date().getFullYear()} Rústico. Todos los derechos reservados.
          </p>
          <p className="font-body font-light text-rustico-sand/30 text-[10px]">
            Powered by Nexo
          </p>
        </div>

      </div>
    </footer>
  )
}
