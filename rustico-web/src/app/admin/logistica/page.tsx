'use client'

import { useState } from 'react'

const zonas = [
  { zona: 'Morón y alrededores', km: '0–10 km', metodo: 'Entrega propia bonificada', costo: '$0 (bonificado)', tiempo: 'Coordinar' },
  { zona: 'GBA Oeste (Merlo, Ituzaingó, Haedo, Castelar)', km: '10–30 km', metodo: 'Entrega propia', costo: '[COMPLETAR]', tiempo: '1–2 días' },
  { zona: 'GBA Sur (Lomas, Lanús, Quilmes)', km: '30–50 km', metodo: 'Fletero de confianza', costo: '[COMPLETAR]', tiempo: '2–3 días' },
  { zona: 'GBA Norte (San Isidro, Tigre, Nordelta)', km: '40–70 km', metodo: 'Fletero de confianza', costo: '[COMPLETAR]', tiempo: '2–3 días' },
  { zona: 'CABA', km: '30–50 km', metodo: 'Fletero de confianza', costo: '[COMPLETAR]', tiempo: '2–3 días' },
  { zona: 'Interior GBA (+70 km)', km: '+70 km', metodo: 'Transporte tercerizado', costo: '[COMPLETAR]', tiempo: '3–5 días' },
  { zona: 'Interior del país', km: 'Variable', metodo: 'No disponible', costo: '—', tiempo: '—' },
]

const embalaje = [
  { producto: 'Rack TV', minimo: 'Film stretch + cartón en esquinas', recomendado: 'Film + cartón + mantas de mudanza' },
  { producto: 'Mesa Ratona', minimo: 'Film stretch + cartón', recomendado: 'Film + cartón + burbuja en tapa' },
  { producto: 'Mesa de Arrime', minimo: 'Film stretch', recomendado: 'Film + cartón en patas' },
  { producto: 'Combo completo', minimo: 'Todo lo anterior', recomendado: 'Flejado del paquete completo' },
]

const protocolo = [
  { paso: '1', titulo: 'Confirmación de venta', desc: 'Enviá el mensaje de confirmación por WA (ver Respuestas → /confirmar)' },
  { paso: '2', titulo: 'Acuerdo de fecha', desc: 'Acordar en las 24hs siguientes a la venta' },
  { paso: '3', titulo: 'Recordatorio', desc: 'Enviar mensaje el día anterior a la entrega' },
  { paso: '4', titulo: 'Entrega', desc: 'Fotografiar el mueble embalado antes de salir' },
  { paso: '5', titulo: 'Post-entrega', desc: 'Mensaje de seguimiento + pedir reseña (2–3 días después)' },
]

function CopyBox({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-[#1a1008] border border-rustico-brown p-4 mb-3">
      <div className="flex items-center justify-between mb-2">
        <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase">{label}</p>
        <button
          onClick={copy}
          className={`font-body text-[9px] tracking-brand-sm uppercase px-3 py-1 transition-colors
            ${copied ? 'bg-rustico-green text-white' : 'bg-rustico-brown text-rustico-cream hover:bg-rustico-gold hover:text-rustico-dark'}`}
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="font-body text-rustico-cream text-xs whitespace-pre-wrap">{text}</pre>
    </div>
  )
}

export default function LogisticaPage() {
  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      <div className="mb-8">
        <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
          Agente 1
        </p>
        <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
          LOGÍSTICA Y ENVÍOS
        </h1>
        <p className="font-body text-rustico-sand text-sm mt-1">
          Matriz de zonas, embalaje y protocolo de entrega
        </p>
      </div>

      {/* Matriz de zonas */}
      <div className="bg-rustico-dark border border-rustico-brown mb-6">
        <div className="p-4 border-b border-rustico-brown">
          <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase">
            Matriz de Decisión — Zona → Método → Costo
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rustico-brown">
                {['Zona', 'Distancia', 'Método', 'Costo estimado', 'Tiempo'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-body text-[9px] text-rustico-sand tracking-brand uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zonas.map((z, i) => (
                <tr key={i} className="border-b border-rustico-brown/30">
                  <td className="px-4 py-3 font-body text-rustico-cream text-sm font-bold">{z.zona}</td>
                  <td className="px-4 py-3 font-body text-rustico-sand text-xs">{z.km}</td>
                  <td className="px-4 py-3 font-body text-rustico-cream text-sm">{z.metodo}</td>
                  <td className={`px-4 py-3 font-display text-base ${z.costo === '$0 (bonificado)' ? 'text-rustico-green' : 'text-rustico-gold'}`}>
                    {z.costo}
                  </td>
                  <td className="px-4 py-3 font-body text-rustico-sand text-xs">{z.tiempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Protocolo */}
        <div className="bg-rustico-dark border border-rustico-brown p-6">
          <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
            Protocolo de Entrega — Paso a Paso
          </p>
          <div className="space-y-4">
            {protocolo.map(p => (
              <div key={p.paso} className="flex gap-4">
                <div className="w-7 h-7 bg-rustico-gold text-rustico-dark font-display text-lg flex items-center justify-center flex-shrink-0">
                  {p.paso}
                </div>
                <div>
                  <p className="font-body text-rustico-cream text-sm font-bold">{p.titulo}</p>
                  <p className="font-body text-rustico-sand text-xs mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embalaje */}
        <div className="bg-rustico-dark border border-rustico-brown p-6">
          <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
            Protocolo de Embalaje por Producto
          </p>
          <div className="space-y-3">
            {embalaje.map((e, i) => (
              <div key={i} className="border-b border-rustico-brown/40 pb-3 last:border-0">
                <p className="font-body text-rustico-gold text-xs font-bold uppercase tracking-brand-sm mb-1">
                  {e.producto}
                </p>
                <p className="font-body text-rustico-sand text-xs">
                  <span className="text-rustico-cream">Mínimo:</span> {e.minimo}
                </p>
                <p className="font-body text-rustico-sand text-xs mt-1">
                  <span className="text-rustico-green">Recomendado:</span> {e.recomendado}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates de mensajes */}
      <div className="mt-6">
        <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
          Templates de Coordinación
        </p>
        <CopyBox
          label="Confirmar compra"
          text={`Hola [NOMBRE]! 🙌 Soy Nexo de Rústico.
Tu pedido está confirmado.
📦 Pedido: [DETALLE]
📍 Entrega en: [DIRECCIÓN/ZONA]
Para coordinar necesito: ¿Disponibilidad horaria? ¿Hay ascensor?
Tiempo de fabricación: [DÍAS] días hábiles 🪵`}
        />
        <CopyBox
          label="Propuesta de fecha"
          text={`Hola [NOMBRE]! Tu mueble está listo 🙌
📅 Puedo entregarlo el [DÍA] [FECHA]:
⏰ Mañana: 9–12hs | Tarde: 14–18hs
¿Cuál te viene mejor?
Dirección: [DIRECCIÓN] ¿Confirmamos?`}
        />
      </div>
    </div>
  )
}
