const segments = [
  {
    icon: '▣',
    title: 'MUEBLERÍAS',
    description:
      'Multi-proveedor o boutique especializada. Capacidad para 100 unidades/mes garantiza reposición inmediata. A minutos de La Matanza y Morón.',
  },
  {
    icon: '◈',
    title: 'DECORACIÓN Y BAZARES',
    description:
      'Consignación sin costo para escaparates aspiracionales. Un mueble ancla de madera reciclada eleva toda la propuesta del local.',
  },
  {
    icon: '◉',
    title: 'GASTRONOMÍA',
    description:
      'Barras, mesas altas comunales y estanterías industriales para bares y cervecerías. Madera reciclada que resiste la alta rotación.',
  },
  {
    icon: '◎',
    title: 'REVENDEDORES ONLINE',
    description:
      'Dropshippers y revendedores de Marketplace. Proveemos fotos profesionales sin marca de agua para publicación inmediata.',
  },
]

const perks = [
  '100 unidades/mes de capacidad productiva',
  'Entrega propia en todo el GBA, sin transportistas',
  'Consignación 30 días para primer pedido',
  'Fotos profesionales sin marca de agua',
  'Medidas a pedido y terminaciones especiales',
  'Exclusividad de zona por línea de producto',
]

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491123677587'

export default function B2BSection() {
  return (
    <section id="mayoristas" className="bg-rustico-dark py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="eyebrow mb-4">Para Negocios</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-rustico-cream text-[clamp(40px,6vw,64px)] tracking-brand-xs leading-none">
              CANAL<br />
              <span className="text-rustico-gold">MAYORISTA</span>
            </h2>
            <p className="font-body font-light text-rustico-sand text-sm leading-relaxed max-w-md lg:text-right">
              Trabajamos con mueblerías, locales de decoración, gastronomía y revendedores de GBA.
              Precio mayorista, condiciones claras y logística propia desde La Matanza.
            </p>
          </div>
        </div>

        {/* Segmentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rustico-brown/20 mb-14">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="bg-rustico-dark p-6 hover:bg-rustico-brown/10 transition-colors duration-300 group"
            >
              <span className="text-rustico-gold text-2xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                {seg.icon}
              </span>
              <h3 className="font-display text-rustico-cream text-xl tracking-brand-sm mb-3">
                {seg.title}
              </h3>
              <p className="font-body font-light text-rustico-sand text-xs leading-relaxed">
                {seg.description}
              </p>
            </div>
          ))}
        </div>

        {/* Perks + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 border border-rustico-brown/40 hover:border-rustico-gold/40 transition-colors duration-300"
              >
                <span className="text-rustico-gold text-base leading-none mt-0.5 flex-shrink-0">✦</span>
                <span className="font-body font-light text-rustico-cream text-sm leading-snug">
                  {perk}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 lg:justify-center">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Soy%20revendedor%20y%20me%20interesa%20trabajar%20con%20Rústico.%20¿Podemos%20hablar?`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Quiero ser revendedor →
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Me%20interesa%20la%20consignación%20de%20una%20pieza%20en%20mi%20local.%20¿Tienen%20disponibilidad?`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-center"
            >
              Proponer consignación →
            </a>
            <p className="font-body font-light text-rustico-sand/50 text-xs text-center leading-relaxed">
              Primera pieza en consignación 30 días sin costo.<br />
              Sin riesgo financiero para el local.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
