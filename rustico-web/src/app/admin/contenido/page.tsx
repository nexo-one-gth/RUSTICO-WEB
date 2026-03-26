'use client'

import { useState } from 'react'

import PublicationPreview from '@/components/admin/PublicationPreview'

type Tab = 'titulos' | 'fichas' | 'facebook' | 'whatsapp' | 'graficas'

function CopyBox({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-[#1a1008] border border-rustico-brown p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase">{label}</p>
        <button
          onClick={copy}
          className={`font-body text-[9px] tracking-brand-sm uppercase px-3 py-1 transition-colors
            ${copied ? 'bg-rustico-green text-white' : 'bg-rustico-brown text-rustico-cream hover:bg-rustico-gold hover:text-rustico-dark'}`}
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="font-body text-rustico-cream text-xs whitespace-pre-wrap leading-relaxed">
        {text}
      </pre>
    </div>
  )
}

const titulos = [
  {
    label: 'Combo Living — Título Principal',
    text: 'Combo Living Rústico Industrial Rack Tv Mesa Ratona Arrime',
  },
  {
    label: 'Combo Living — Variante B',
    text: 'Rack Tv Mesa Ratona Arrime Living Rústico Industrial Madera',
  },
  {
    label: 'Combo Living — Variante C',
    text: 'Combo Living Industrial Rack Tv + Mesa Ratona + Mesa Arrime',
  },
  {
    label: 'Rack TV — Título Principal',
    text: 'Rack Mueble Tv Rústico Industrial Madera Reciclada Hierro',
  },
  {
    label: 'Mesa Ratona — Título Principal',
    text: 'Mesa Ratona Rústica Industrial Madera Reciclada Y Hierro',
  },
  {
    label: 'Mesa de Arrime — Título Principal',
    text: 'Mesa De Arrime Rústica Industrial Madera Y Hierro Living',
  },
]

const fichaCombo = `🪵 COMBO LIVING RÚSTICO INDUSTRIAL — Las 3 piezas que transforman tu living

Incluye:
✅ Rack para TV
✅ Mesa Ratona
✅ Mesa de Arrime

Fabricadas artesanalmente en nuestro taller de González Catán, GBA.
Cada pieza es única — la madera reciclada tiene su propia historia.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📐 MEDIDAS
RACK TV: [LARGO] x [ALTO] x [PROF] cm — Soporta TV hasta [X]"
MESA RATONA: [LARGO] x [ANCHO] x [ALTO] cm
MESA DE ARRIME: [LARGO/DIÁM] x [ALTO] cm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🪵 MATERIALES
• Madera: [Tipo] tratada con aceite de lino
• Estructura: Hierro con acabado [epoxy/pintura al horno]
• Uniones: Tornillos y soldadura de alta resistencia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚚 ENVÍO Y ENTREGA
• Retiro en showroom: Morón, GBA
• Entrega a domicilio: AMBA y CABA
• Flete a cargo del comprador

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 PREGUNTAS FRECUENTES
¿Hacen a medida? Sí. Consultanos antes de comprar.
¿Puedo ver el showroom? Sí, coordinamos en Morón.
¿El precio incluye las 3 piezas? Sí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rústico — Muebles artesanales, estilo industrial, taller propio. 🪵`

const postsABC1 = [
  {
    label: 'ABC1 — Historia del material',
    text: `Cada tabla que usamos tiene una historia.

Vigas recuperadas de demoliciones, madera de
estructuras que tenían décadas. Las limpiamos,
las tratamos, y las convertimos en muebles que
van a durar otras décadas más.

Este Combo Living es para quien entiende que
lo artesanal vale más que lo de serie.

Rack TV + Mesa Ratona + Mesa de Arrime.
Hierro y madera reciclada. Hecho en GBA, con taller propio.

📲 Consultas: [NÚMERO WA]
🏠 Showroom en Morón (con turno previo)`,
  },
  {
    label: 'Zona Oeste — Taller propio',
    text: `Somos de acá 🙌

Taller en González Catán, showroom en Morón.
Si estás en la zona, podés venir a ver los muebles
antes de comprar, sin compromiso.

Combo Living: Rack TV + Mesa Ratona + Mesa de Arrime
Precio de fábrica, sin intermediarios.

📲 WhatsApp: [NÚMERO WA]
📍 Showroom Morón (con turno)`,
  },
  {
    label: 'Airbnb — ROI y estilo',
    text: `Los anfitriones de Airbnb saben que el estilo sube el precio de la noche.

Un living rústico-industrial bien equipado puede
subir tu tarifa un 15–30% y mejorar tu rating.

Nuestro Combo Living incluye:
🪵 Rack para TV con estilo industrial
☕ Mesa Ratona para el espacio central
📐 Mesa de Arrime para completar el ambiente

Precio de fábrica. Madera reciclada + hierro.
Entrega en todo AMBA 🚚

📲 [NÚMERO WA]`,
  },
]

const waTemplates = [
  {
    label: '/precio — Consulta de precio',
    text: `Hola! 🙌 El Combo Living Rústico Industrial
(Rack TV + Mesa Ratona + Mesa de Arrime) está en:

💰 $[PRECIO ACTUAL]
📦 En 3 cuotas sin interés: $[CUOTA] x 3

También vendemos las piezas por separado.
¿Querés que te cuente más?`,
  },
  {
    label: '/envio — Consulta de envío',
    text: `Hacemos entregas en todo AMBA 🚚

📍 Retiro gratis en nuestro showroom de Morón
🚛 Entrega a domicilio: costo según zona (te cotizo)

Para cotizarte el flete necesito que me confirmes
el barrio/localidad. ¿De dónde sos?`,
  },
  {
    label: '/personalizar — Consulta a medida',
    text: `¡Sí! Trabajamos por encargo y podemos adaptar:
✅ Medidas (largo, alto, profundidad)
✅ Color del hierro
✅ Tipo de acabado de la madera
✅ Cantidad de estantes

Mandame las medidas de tu espacio y
te armo una cotización sin costo 📐`,
  },
  {
    label: '/pedir-resena — Post-entrega',
    text: `Hola [NOMBRE]! Cómo te fue con el [PRODUCTO]? 🙌

Te pido un favorcito: si podés dejarnos
una calificación en Mercado Libre, nos ayuda
un montón a seguir creciendo 🌟

¡Muchas gracias de corazón! 🪵
— Nexo, Rústico`,
  },
]

export default function ContenidoPage() {
  const [tab, setTab] = useState<Tab>('titulos')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'titulos', label: 'Títulos SEO' },
    { id: 'fichas', label: 'Ficha ML' },
    { id: 'facebook', label: 'Posts Facebook' },
    { id: 'whatsapp', label: 'Respuestas WA' },
    { id: 'graficas', label: 'Gráficas' },
  ]

  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      <div className="mb-8">
        <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
          Agentes 3 + 8 + 9
        </p>
        <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
          BIBLIOTECA DE CONTENIDO
        </h1>
        <p className="font-body text-rustico-sand text-sm mt-1">
          Todos los textos listos para copiar y pegar
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-rustico-brown">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 font-body font-bold text-xs tracking-brand-sm uppercase transition-colors
              ${tab === t.id
                ? 'bg-rustico-gold text-rustico-dark'
                : 'text-rustico-sand hover:text-rustico-cream'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {tab === 'titulos' && (
          <div>
            <p className="font-body text-rustico-sand text-xs mb-4">
              Títulos optimizados para aparecer en búsquedas de Mercado Libre. Máx. 60 caracteres.
            </p>
            {titulos.map((t, i) => (
              <CopyBox key={i} label={t.label} text={t.text} />
            ))}
          </div>
        )}

        {tab === 'fichas' && (
          <div>
            <p className="font-body text-rustico-sand text-xs mb-4">
              Descripción completa del Combo. Completar los campos [ENTRE CORCHETES] antes de publicar.
            </p>
            <CopyBox label="Descripción Combo Living — Lista para ML" text={fichaCombo} />
          </div>
        )}

        {tab === 'facebook' && (
          <div>
            <p className="font-body text-rustico-sand text-xs mb-4">
              Posts para grupos de Facebook. Recordá reemplazar [NÚMERO WA] antes de publicar.
            </p>
            {postsABC1.map((p, i) => (
              <CopyBox key={i} label={p.label} text={p.text} />
            ))}
          </div>
        )}

        {tab === 'whatsapp' && (
          <div>
            <p className="font-body text-rustico-sand text-xs mb-4">
              Templates para WhatsApp Business. Configurar en WA → Herramientas → Respuestas rápidas.
            </p>
            {waTemplates.map((w, i) => (
              <CopyBox key={i} label={w.label} text={w.text} />
            ))}
          </div>
        )}

        {tab === 'graficas' && (
          <div>
            <p className="font-body text-rustico-sand text-xs mb-6">
              Generador de mockups con diseño Rústico. Seleccioná un producto para previsualizar y descargar la pieza gráfica.
            </p>
            <PublicationPreview />
          </div>
        )}
      </div>
    </div>
  )
}
