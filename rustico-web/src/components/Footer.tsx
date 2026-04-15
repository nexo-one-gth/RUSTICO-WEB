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
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/rustic0muebles/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-rustico-sand hover:text-rustico-gold transition-colors"
                aria-label="Instagram de Rústico"
              >
                {/* Instagram official glyph */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                <span className="font-body font-bold text-[10px] tracking-brand-sm uppercase">
                  Instagram
                </span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61575750940128&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-rustico-sand hover:text-rustico-gold transition-colors"
                aria-label="Facebook de Rústico"
              >
                {/* Facebook official logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span className="font-body font-bold text-[10px] tracking-brand-sm uppercase">
                  Facebook
                </span>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-rustico-sand hover:text-rustico-green transition-colors"
                aria-label="WhatsApp de Rústico"
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.01a9.87 9.87 0 01-5.03-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 012.15 12.01C2.15 6.558 6.59 2.12 12.05 2.12c2.653 0 5.14 1.033 7.012 2.91a9.846 9.846 0 012.904 7.006c-.004 5.45-4.44 9.89-9.916 9.89v-.14zm8.413-18.278A11.815 11.815 0 0012.05.12C5.495.12.16 5.454.157 12.01a11.81 11.81 0 001.588 5.946L0 24l6.196-1.625a11.86 11.86 0 005.647 1.44h.01c6.553 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.483-8.415z" />
                </svg>
                <span className="font-body font-bold text-[10px] tracking-brand-sm uppercase">
                  WhatsApp
                </span>
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
