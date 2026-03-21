'use client'

import { useState, useEffect } from 'react'

type Estado = 'pendiente' | 'contactado' | 'comprado' | 'entregado' | 'calificado'

interface Venta {
  id: number
  contacto: string
  producto: string
  monto: number
  estado: Estado
  resena: boolean
  notas: string
}

const estadoColors: Record<Estado, string> = {
  pendiente: 'bg-rustico-brown text-rustico-sand',
  contactado: 'bg-yellow-700 text-yellow-200',
  comprado: 'bg-blue-800 text-blue-200',
  entregado: 'bg-rustico-olive text-rustico-cream',
  calificado: 'bg-rustico-green text-white',
}

const estadoLabels: Record<Estado, string> = {
  pendiente: 'Pendiente',
  contactado: 'Contactado',
  comprado: 'Comprado en ML',
  entregado: 'Entregado',
  calificado: '⭐ Calificado',
}

const vaciaVentas: Venta[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  contacto: '',
  producto: '',
  monto: 0,
  estado: 'pendiente',
  resena: false,
  notas: '',
}))

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>(vaciaVentas)
  const [editando, setEditando] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('rustico_ventas')
    if (stored) setVentas(JSON.parse(stored))
  }, [])

  function save(v: Venta[]) {
    localStorage.setItem('rustico_ventas', JSON.stringify(v))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function update(id: number, field: keyof Venta, value: string | boolean | number) {
    const updated = ventas.map(v => v.id === id ? { ...v, [field]: value } : v)
    setVentas(updated)
    save(updated)
  }

  const completadas = ventas.filter(v => v.estado === 'calificado').length
  const entregadas = ventas.filter(v => ['entregado', 'calificado'].includes(v.estado)).length
  const enProceso = ventas.filter(v => ['comprado', 'contactado'].includes(v.estado)).length
  const ingresoTotal = ventas.reduce((sum, v) => sum + (v.monto || 0), 0)

  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
            Agente 4
          </p>
          <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
            TRACKER — 10 PRIMERAS VENTAS
          </h1>
          <p className="font-body text-rustico-sand text-sm mt-1">
            Seguimiento de la estrategia de construcción de reputación
          </p>
        </div>
        {saved && (
          <span className="font-body text-rustico-green text-xs tracking-brand-sm uppercase bg-rustico-dark border border-rustico-green px-3 py-2">
            ✓ Guardado
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Calificadas', value: completadas, color: 'text-rustico-green' },
          { label: 'Entregadas', value: entregadas, color: 'text-rustico-gold' },
          { label: 'En proceso', value: enProceso, color: 'text-yellow-400' },
          { label: 'Ingreso total', value: `$${ingresoTotal.toLocaleString('es-AR')}`, color: 'text-rustico-gold' },
        ].map(s => (
          <div key={s.label} className="bg-rustico-dark border border-rustico-brown p-4">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-1">{s.label}</p>
            <p className={`font-display text-3xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-rustico-dark border border-rustico-brown p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-body text-rustico-sand text-xs">Progreso hacia el termómetro verde</span>
          <span className="font-display text-rustico-gold text-2xl">{completadas}/10</span>
        </div>
        <div className="w-full bg-rustico-brown h-2">
          <div
            className="bg-rustico-green h-2 transition-all duration-500"
            style={{ width: `${(completadas / 10) * 100}%` }}
          />
        </div>
        <p className="font-body text-rustico-sand text-xs mt-2">
          {completadas >= 10
            ? '🟢 ¡Termómetro verde activo! Ya podés activar Mercado Ads.'
            : `Faltan ${10 - completadas} calificaciones para el termómetro verde.`}
        </p>
      </div>

      {/* Tabla */}
      <div className="bg-rustico-dark border border-rustico-brown overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-rustico-brown">
              {['#', 'Contacto', 'Producto', 'Monto', 'Estado', 'Reseña', 'Notas'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-body text-[9px] text-rustico-sand tracking-brand uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id} className="border-b border-rustico-brown/30 hover:bg-rustico-brown/10">
                <td className="px-4 py-3 font-display text-rustico-gold text-lg">{v.id}</td>
                <td className="px-4 py-3">
                  <input
                    value={v.contacto}
                    onChange={e => update(v.id, 'contacto', e.target.value)}
                    placeholder="Nombre..."
                    className="bg-transparent font-body text-rustico-cream text-sm outline-none border-b border-transparent focus:border-rustico-gold transition-colors w-full min-w-[120px]"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={v.producto}
                    onChange={e => update(v.id, 'producto', e.target.value)}
                    placeholder="Producto..."
                    className="bg-transparent font-body text-rustico-cream text-sm outline-none border-b border-transparent focus:border-rustico-gold transition-colors w-full min-w-[120px]"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={v.monto || ''}
                    onChange={e => update(v.id, 'monto', Number(e.target.value))}
                    placeholder="0"
                    className="bg-transparent font-body text-rustico-cream text-sm outline-none border-b border-transparent focus:border-rustico-gold transition-colors w-24"
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    value={v.estado}
                    onChange={e => update(v.id, 'estado', e.target.value as Estado)}
                    className={`font-body text-xs font-bold tracking-brand-sm uppercase px-2 py-1 outline-none cursor-pointer ${estadoColors[v.estado]}`}
                  >
                    {Object.entries(estadoLabels).map(([k, label]) => (
                      <option key={k} value={k}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={v.resena}
                    onChange={e => update(v.id, 'resena', e.target.checked)}
                    className="w-4 h-4 accent-rustico-green cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={v.notas}
                    onChange={e => update(v.id, 'notas', e.target.value)}
                    placeholder="Notas..."
                    className="bg-transparent font-body text-rustico-sand text-xs outline-none border-b border-transparent focus:border-rustico-gold transition-colors w-full min-w-[140px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-body text-rustico-sand text-xs mt-3">
        Los datos se guardan automáticamente en este dispositivo (localStorage).
      </p>
    </div>
  )
}
