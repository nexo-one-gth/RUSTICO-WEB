const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491123677587'

const items = [
  {
    label: 'Mesas altas comunales',
    detail: 'Tablas anchas de madera reciclada sobre estructura metálica. Resistencia para 200+ comensales diarios.',
  },
  {
    label: 'Barras y mostradores',
    detail: 'Barras de 2 a 4 metros con opciones de frente macizo o ladrillo expuesto. El corazón del salón.',
  },
  {
    label: 'Estanterías industriales',
    detail: 'Hierro + madera para exhibición de botellas, plantas y decoración. Altura y volumen visual garantizados.',
  },
  {
    label: 'Mesas de comedor grupales',
    detail: 'Desde 1,60 a 2,40 m. Tapas de madera reciclada con tratamiento anti-humedad para uso gastronómico.',
  },
]

export default function HORECASection() {
  return (
    <section id="gastronomia" className="bg-rustico-warm py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Texto */}
          <div>
            <p className="eyebrow mb-6">Gastronomía &amp; Hospitalidad</p>
            <h2 className="font-display text-rustico-dark text-[clamp(36px,5.5vw,60px)] tracking-brand-xs leading-none mb-6">
              PARA BARES,<br />
              <span className="text-rustico-gold">RESTÓS Y<br />CERVECERÍAS</span>
            </h2>
            <p className="font-body font-light text-rustico-text/70 text-sm leading-relaxed mb-4 max-w-md">
              El estilo industrial-rústico es la norma en la gastronomía del GBA oeste.
              Madera reciclada y hierro comunican autenticidad y resisten la alta rotación mejor que cualquier alternativa.
            </p>
            <p className="font-body font-light text-rustico-text/60 text-sm leading-relaxed mb-8 max-w-md">
              Con la apertura del Hotel Hilton y el complejo Thays en Parque Leloir (2026), la demanda de renovación en bares y cervecerías del corredor oeste se multiplica. Llegá primero.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Tengo%20un%20bar/restó%20y%20me%20interesa%20amueblar%20el%20salón%20con%20madera%20reciclada.%20¿Podemos%20hablar?`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                Consultar para mi local →
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Soy%20arquitecto/diseñador%20y%20me%20interesa%20incluir%20Rústico%20como%20proveedor%20en%20proyectos%20gastronómicos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center"
              >
                Soy arquitecto / diseñador
              </a>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-px bg-rustico-brown/20">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-rustico-warm p-6 hover:bg-rustico-light transition-colors duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-rustico-gold font-display text-2xl leading-none mt-0.5 flex-shrink-0 group-hover:text-rustico-brown transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-display text-rustico-dark text-lg tracking-brand-sm mb-1">
                      {item.label}
                    </h4>
                    <p className="font-body font-light text-rustico-text/60 text-xs leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
