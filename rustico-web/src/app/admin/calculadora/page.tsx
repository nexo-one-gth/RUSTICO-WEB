'use client'

import { useState, useCallback } from 'react'

type TipoPublicacion = 'clasica' | 'premium'

const COMISIONES = {
  clasica: 0.1452,
  premium: 0.1936,
}

const RETENCIONES = 0.05

const CUOTAS = [
  { label: 'Sin cuotas', value: 1, costo: 0 },
  { label: '3 cuotas s/i', value: 3, costo: 0.029 },
  { label: '6 cuotas s/i', value: 6, costo: 0.068 },
  { label: '12 cuotas s/i', value: 12, costo: 0.145 },
]

function formatARS(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export default function CalculadoraPage() {
  const [costo, setCosto] = useState(470000)
  const [ganancia, setGanancia] = useState(200000)
  const [tipo, setTipo] = useState<TipoPublicacion>('clasica')
  const [cuotasIdx, setCuotasIdx] = useState(1) // 3 cuotas por defecto

  const neto = costo + ganancia
  const cuota = CUOTAS[cuotasIdx]
  const deducciones = COMISIONES[tipo] + RETENCIONES + cuota.costo
  const precioVenta = Math.ceil(neto / (1 - deducciones) / 1000) * 1000
  const cuotaMonto = cuota.value > 1 ? precioVenta / cuota.value : 0
  const netoReal = precioVenta * (1 - deducciones)
  const margenReal = netoReal - costo

  const escenarios = CUOTAS.map(c => {
    const ded = COMISIONES[tipo] + RETENCIONES + c.costo
    const precio = Math.ceil(neto / (1 - ded) / 1000) * 1000
    return { ...c, precio, cuotaMonto: c.value > 1 ? precio / c.value : null }
  })

  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      <div className="mb-8">
        <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
          Agente 5
        </p>
        <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
          CALCULADORA DE PRECIOS
        </h1>
        <p className="font-body text-rustico-sand text-sm mt-1">
          Ingresá tus costos y obtenés el precio exacto para publicar en ML
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Inputs */}
        <div className="bg-rustico-dark border border-rustico-brown p-6 space-y-6">
          <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase">
            Parámetros
          </p>

          {/* Costo */}
          <div>
            <label className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase block mb-2">
              Costo de fabricación
            </label>
            <input
              type="number"
              value={costo}
              onChange={e => setCosto(Number(e.target.value))}
              className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-lg px-4 py-3 outline-none focus:border-rustico-gold transition-colors"
            />
            <p className="text-rustico-sand text-xs mt-1 font-body">
              Materiales + mano de obra + insumos
            </p>
          </div>

          {/* Ganancia */}
          <div>
            <label className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase block mb-2">
              Ganancia objetivo mínima
            </label>
            <input
              type="number"
              value={ganancia}
              onChange={e => setGanancia(Number(e.target.value))}
              className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-lg px-4 py-3 outline-none focus:border-rustico-gold transition-colors"
            />
          </div>

          {/* Tipo publicación */}
          <div>
            <label className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase block mb-2">
              Tipo de publicación
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['clasica', 'premium'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`py-3 font-body font-bold text-xs tracking-brand-sm uppercase transition-colors
                    ${tipo === t
                      ? 'bg-rustico-gold text-rustico-dark'
                      : 'border border-rustico-brown text-rustico-sand hover:border-rustico-gold hover:text-rustico-cream'
                    }`}
                >
                  {t === 'clasica' ? 'Clásica (12%)' : 'Premium (16%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Cuotas */}
          <div>
            <label className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase block mb-2">
              Cuotas sin interés
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CUOTAS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setCuotasIdx(i)}
                  className={`py-3 font-body font-bold text-xs tracking-brand-sm uppercase transition-colors
                    ${cuotasIdx === i
                      ? 'bg-rustico-gold text-rustico-dark'
                      : 'border border-rustico-brown text-rustico-sand hover:border-rustico-gold hover:text-rustico-cream'
                    }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-4">

          {/* Precio recomendado */}
          <div className="bg-rustico-gold p-6">
            <p className="font-body text-rustico-dark text-[9px] tracking-brand uppercase mb-2">
              Precio de publicación recomendado
            </p>
            <p className="font-display text-rustico-dark text-5xl tracking-brand-xs">
              {formatARS(precioVenta)}
            </p>
            {cuota.value > 1 && (
              <p className="font-body text-rustico-dark text-sm mt-2 font-bold">
                {formatARS(cuotaMonto)} x {cuota.value} cuotas sin interés
              </p>
            )}
          </div>

          {/* Desglose */}
          <div className="bg-rustico-dark border border-rustico-brown p-6">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
              Desglose de deducciones
            </p>
            <div className="space-y-3">
              {[
                { label: 'Precio de venta', value: precioVenta, highlight: false },
                { label: `Comisión ML (${tipo === 'clasica' ? '14.52' : '19.36'}%)`, value: -precioVenta * COMISIONES[tipo], highlight: false },
                { label: `Retenciones AFIP (~5%)`, value: -precioVenta * RETENCIONES, highlight: false },
                { label: `Cuotas s/i (${(cuota.costo * 100).toFixed(1)}%)`, value: -precioVenta * cuota.costo, highlight: false },
                { label: 'Neto recibido', value: netoReal, highlight: true },
                { label: '— Costo fabricación', value: -costo, highlight: false },
                { label: 'Ganancia real', value: margenReal, highlight: true },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center ${row.highlight ? 'pt-2 border-t border-rustico-brown' : ''}`}>
                  <span className={`font-body text-xs ${row.highlight ? 'text-rustico-cream font-bold' : 'text-rustico-sand'}`}>
                    {row.label}
                  </span>
                  <span className={`font-display text-base ${
                    row.highlight
                      ? 'text-rustico-gold'
                      : row.value < 0
                        ? 'text-red-400'
                        : 'text-rustico-cream'
                  }`}>
                    {formatARS(row.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* % total de deducciones */}
          <div className="bg-rustico-dark border border-rustico-brown p-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-rustico-sand text-xs">Total deducciones</span>
              <span className="font-display text-rustico-gold text-2xl">
                {(deducciones * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de todos los escenarios */}
      <div className="mt-6 bg-rustico-dark border border-rustico-brown p-6">
        <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
          Tabla de Escenarios — {tipo === 'clasica' ? 'Publicación Clásica' : 'Publicación Premium'}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rustico-brown">
                {['Cuotas', 'Costo cuotas', 'Precio sugerido', 'Cuota/mes', 'Neto estimado'].map(h => (
                  <th key={h} className="text-left py-2 pr-6 font-body text-[9px] text-rustico-sand tracking-brand uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escenarios.map((e, i) => (
                <tr
                  key={i}
                  className={`border-b border-rustico-brown/40 ${i === cuotasIdx ? 'bg-rustico-brown/30' : ''}`}
                >
                  <td className="py-3 pr-6 font-body text-rustico-cream text-sm">{e.label}</td>
                  <td className="py-3 pr-6 font-body text-rustico-sand text-sm">{(e.costo * 100).toFixed(1)}%</td>
                  <td className="py-3 pr-6 font-display text-rustico-gold text-base">{formatARS(e.precio)}</td>
                  <td className="py-3 pr-6 font-body text-rustico-cream text-sm">
                    {e.cuotaMonto ? `${formatARS(e.cuotaMonto)} x ${e.value}` : '—'}
                  </td>
                  <td className="py-3 pr-6 font-body text-rustico-cream text-sm">
                    {formatARS(e.precio * (1 - COMISIONES[tipo] - RETENCIONES - e.costo))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-rustico-sand text-xs mt-4">
          * Los porcentajes son aproximados. Verificar comisiones actuales en tu panel de ML.
        </p>
      </div>
    </div>
  )
}
