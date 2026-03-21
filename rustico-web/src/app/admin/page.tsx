'use client'

import Link from 'next/link'

const planProgress = [
  { id: 0, label: 'Setup Fiscal & MP', done: false, href: '/admin' },
  { id: 1, label: 'Logística y Envíos', done: false, href: '/admin/logistica' },
  { id: 2, label: 'Fotografía', done: false, href: '/admin/contenido' },
  { id: 3, label: 'SEO y Redacción', done: false, href: '/admin/contenido' },
  { id: 4, label: 'Primeras 10 Ventas', done: false, href: '/admin/ventas' },
  { id: 5, label: 'Pricing', done: false, href: '/admin/calculadora' },
  { id: 6, label: 'Publicación ML', done: false, href: '/admin/contenido' },
  { id: 7, label: 'Mercado Ads', done: false, href: '/admin/metricas' },
  { id: 8, label: 'Facebook Guerrilla', done: false, href: '/admin/contenido' },
  { id: 9, label: 'Atención ML', done: false, href: '/admin/respuestas' },
  { id: 10, label: 'Métricas', done: false, href: '/admin/metricas' },
]

const quickActions = [
  { label: 'Calcular Precio ML', href: '/admin/calculadora', color: 'bg-rustico-gold', text: 'text-rustico-dark' },
  { label: 'Ver Textos FB', href: '/admin/contenido', color: 'bg-rustico-brown', text: 'text-rustico-cream' },
  { label: 'Tracker Ventas', href: '/admin/ventas', color: 'bg-rustico-green', text: 'text-white' },
  { label: 'Banco Respuestas', href: '/admin/respuestas', color: 'bg-[#3a2a1e]', text: 'text-rustico-gold' },
]

const checklist = [
  { label: 'CUIT activo en AFIP', done: false },
  { label: 'Monotributo inscripto', done: false },
  { label: 'Cuenta ML verificada', done: false },
  { label: 'Mercado Pago vinculado', done: false },
  { label: 'CBU asociado en MP', done: false },
  { label: 'Fotos del combo listas', done: false },
  { label: 'Ficha técnica completa', done: false },
  { label: 'Precio calculado', done: false },
  { label: 'Publicación activa en ML', done: false },
  { label: 'Primeras 10 ventas completas', done: false },
  { label: 'Termómetro verde activo', done: false },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      {/* Header */}
      <div className="mb-8">
        <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
          Panel Operativo
        </p>
        <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
          DASHBOARD
        </h1>
        <p className="font-body text-rustico-sand text-sm mt-1">
          Estado general del plan de lanzamiento en Mercado Libre
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {quickActions.map(action => (
          <Link
            key={action.href}
            href={action.href}
            className={`${action.color} ${action.text} p-4 font-body font-bold text-xs tracking-brand-sm uppercase hover:opacity-90 transition-opacity`}
          >
            {action.label} →
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Checklist de Lanzamiento */}
        <div className="lg:col-span-2 bg-rustico-dark border border-rustico-brown p-6">
          <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
            Checklist de Lanzamiento
          </p>
          <div className="space-y-2">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center
                  ${item.done ? 'bg-rustico-green border-rustico-green' : 'border-rustico-brown'}`}>
                  {item.done && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className={`font-body text-sm ${item.done ? 'text-rustico-sand line-through' : 'text-rustico-cream'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-rustico-brown">
            <div className="flex items-center justify-between mb-1">
              <span className="font-body text-rustico-sand text-xs">Progreso</span>
              <span className="font-display text-rustico-gold text-lg">
                {checklist.filter(c => c.done).length}/{checklist.length}
              </span>
            </div>
            <div className="w-full bg-rustico-brown h-1">
              <div
                className="bg-rustico-gold h-1 transition-all duration-500"
                style={{ width: `${(checklist.filter(c => c.done).length / checklist.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="space-y-4">

          {/* Datos clave del combo */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
              Combo Living — Datos Clave
            </p>
            <div className="space-y-3">
              {[
                { label: 'Costo fabricación', value: '$470.000' },
                { label: 'Ganancia objetivo', value: '$200.000' },
                { label: 'Neto mínimo', value: '$670.000' },
                { label: 'Precio publicado', value: '$1.150.000' },
                { label: 'Cuota (3x)', value: '$383.000' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="font-body text-rustico-sand text-xs">{item.label}</span>
                  <span className="font-display text-rustico-gold text-base">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan de 11 agentes */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
              Plan — 11 Agentes
            </p>
            <div className="space-y-1">
              {planProgress.map(item => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 flex-shrink-0 ${item.done ? 'bg-rustico-green' : 'bg-rustico-brown'}`} />
                  <span className="font-body text-rustico-sand text-xs truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-rustico-brown">
        <p className="font-body text-rustico-sand text-xs">
          Rústico — Taller González Catán | Showroom Morón | AMBA
        </p>
      </div>
    </div>
  )
}
