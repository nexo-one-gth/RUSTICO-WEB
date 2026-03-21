'use client'

import { useState, useEffect } from 'react'

interface Semana {
  id: number
  fecha: string
  ventas: number
  ingresosBrutos: number
  calificaciones: number
  calificacionPromedio: number
  visitasPublicacion: number
  consultasML: number
  inversionAds: number
  ventasAds: number
  postsFB: number
  consultasFB: number
  notas: string
}

function nuevaSemana(id: number): Semana {
  return {
    id,
    fecha: '',
    ventas: 0,
    ingresosBrutos: 0,
    calificaciones: 0,
    calificacionPromedio: 5,
    visitasPublicacion: 0,
    consultasML: 0,
    inversionAds: 0,
    ventasAds: 0,
    postsFB: 0,
    consultasFB: 0,
    notas: '',
  }
}

function formatARS(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export default function MetricasPage() {
  const [semanas, setSemanas] = useState<Semana[]>([nuevaSemana(1)])
  const [semanaActual, setSemanaActual] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('rustico_metricas')
    if (stored) {
      const data = JSON.parse(stored)
      setSemanas(data)
    }
  }, [])

  function save(s: Semana[]) {
    localStorage.setItem('rustico_metricas', JSON.stringify(s))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function update(field: keyof Semana, value: string | number) {
    const updated = semanas.map((s, i) =>
      i === semanaActual ? { ...s, [field]: value } : s
    )
    setSemanas(updated)
    save(updated)
  }

  function addSemana() {
    const updated = [...semanas, nuevaSemana(semanas.length + 1)]
    setSemanas(updated)
    setSemanaActual(updated.length - 1)
    save(updated)
  }

  const s = semanas[semanaActual]
  const acos = s.ventasAds > 0 ? (s.inversionAds / s.ingresosBrutos) * 100 : 0
  const conversion = s.visitasPublicacion > 0 ? (s.ventas / s.visitasPublicacion) * 100 : 0
  const totalVentas = semanas.reduce((sum, s) => sum + s.ventas, 0)
  const totalIngresos = semanas.reduce((sum, s) => sum + s.ingresosBrutos, 0)
  const totalCalificaciones = semanas.reduce((sum, s) => sum + s.calificaciones, 0)

  function acosStatus(v: number) {
    if (v === 0) return { color: 'text-rustico-sand', label: 'Sin ads' }
    if (v < 8) return { color: 'text-rustico-green', label: '↑ Subir presupuesto' }
    if (v <= 15) return { color: 'text-rustico-gold', label: '✓ En rango' }
    if (v <= 20) return { color: 'text-yellow-400', label: '! Revisar' }
    return { color: 'text-red-400', label: '✕ Pausar ads' }
  }

  const acostSt = acosStatus(acos)

  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
            Agente 10
          </p>
          <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
            MÉTRICAS
          </h1>
          <p className="font-body text-rustico-sand text-sm mt-1">
            Dashboard semanal de performance
          </p>
        </div>
        {saved && (
          <span className="font-body text-rustico-green text-xs tracking-brand-sm uppercase bg-rustico-dark border border-rustico-green px-3 py-2">
            ✓ Guardado
          </span>
        )}
      </div>

      {/* Acumulado total */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Ventas totales', value: totalVentas, suffix: '' },
          { label: 'Ingresos acum.', value: formatARS(totalIngresos), suffix: '' },
          { label: 'Calificaciones', value: totalCalificaciones, suffix: '/10 para termómetro' },
        ].map(item => (
          <div key={item.label} className="bg-rustico-dark border border-rustico-brown p-4">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-1">{item.label}</p>
            <p className="font-display text-rustico-gold text-3xl">{item.value}</p>
            {item.suffix && <p className="font-body text-rustico-sand text-xs">{item.suffix}</p>}
          </div>
        ))}
      </div>

      {/* Selector de semana */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-1 flex-wrap">
          {semanas.map((s, i) => (
            <button
              key={i}
              onClick={() => setSemanaActual(i)}
              className={`px-3 py-2 font-body font-bold text-xs tracking-brand-sm uppercase transition-colors
                ${semanaActual === i
                  ? 'bg-rustico-gold text-rustico-dark'
                  : 'border border-rustico-brown text-rustico-sand hover:text-rustico-cream'
                }`}
            >
              Semana {s.id}
            </button>
          ))}
        </div>
        <button
          onClick={addSemana}
          className="border border-rustico-gold text-rustico-gold font-body font-bold text-xs tracking-brand-sm uppercase px-3 py-2 hover:bg-rustico-gold hover:text-rustico-dark transition-colors"
        >
          + Nueva semana
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Inputs izquierda */}
        <div className="space-y-4">

          {/* Fecha */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-3">
              Período — Semana {s.id}
            </p>
            <input
              type="text"
              value={s.fecha}
              onChange={e => update('fecha', e.target.value)}
              placeholder="Ej: 24/03 al 30/03"
              className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-sm px-3 py-2 outline-none focus:border-rustico-gold transition-colors"
            />
          </div>

          {/* Ventas */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-3">
              Ventas
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Cantidad vendida', field: 'ventas' as keyof Semana, type: 'number' },
                { label: 'Ingresos brutos ($)', field: 'ingresosBrutos' as keyof Semana, type: 'number' },
                { label: 'Calificaciones recibidas', field: 'calificaciones' as keyof Semana, type: 'number' },
                { label: 'Calif. promedio (1-5)', field: 'calificacionPromedio' as keyof Semana, type: 'number' },
              ].map(f => (
                <div key={f.field}>
                  <label className="font-body text-rustico-sand text-[9px] tracking-brand-sm uppercase block mb-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={(s[f.field] as number) || ''}
                    onChange={e => update(f.field, Number(e.target.value))}
                    className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-sm px-3 py-2 outline-none focus:border-rustico-gold transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Publicación ML */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-3">
              Publicación ML
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Visitas a publicación', field: 'visitasPublicacion' as keyof Semana },
                { label: 'Consultas recibidas', field: 'consultasML' as keyof Semana },
              ].map(f => (
                <div key={f.field}>
                  <label className="font-body text-rustico-sand text-[9px] tracking-brand-sm uppercase block mb-1">
                    {f.label}
                  </label>
                  <input
                    type="number"
                    value={(s[f.field] as number) || ''}
                    onChange={e => update(f.field, Number(e.target.value))}
                    className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-sm px-3 py-2 outline-none focus:border-rustico-gold transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ads */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-3">
              Mercado Ads
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Inversión ($)', field: 'inversionAds' as keyof Semana },
                { label: 'Ventas vía ads', field: 'ventasAds' as keyof Semana },
              ].map(f => (
                <div key={f.field}>
                  <label className="font-body text-rustico-sand text-[9px] tracking-brand-sm uppercase block mb-1">
                    {f.label}
                  </label>
                  <input
                    type="number"
                    value={(s[f.field] as number) || ''}
                    onChange={e => update(f.field, Number(e.target.value))}
                    className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-sm px-3 py-2 outline-none focus:border-rustico-gold transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <label className="font-body text-rustico-sand text-[9px] tracking-brand uppercase block mb-2">
              Notas / Acción de la semana
            </label>
            <textarea
              value={s.notas}
              onChange={e => update('notas', e.target.value)}
              placeholder="¿Qué funcionó? ¿Qué hay que mejorar?"
              rows={3}
              className="w-full bg-[#1a1008] border border-rustico-brown text-rustico-cream font-body text-sm px-3 py-2 outline-none focus:border-rustico-gold transition-colors resize-none"
            />
          </div>
        </div>

        {/* KPIs calculados */}
        <div className="space-y-4">
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">
              KPIs Calculados — Semana {s.id}
            </p>
            <div className="space-y-4">

              {[
                {
                  label: 'Ventas',
                  value: s.ventas,
                  suffix: '',
                  target: '3–5 ventas/semana',
                  status: s.ventas >= 3 ? 'green' : s.ventas > 0 ? 'yellow' : 'red',
                },
                {
                  label: 'Ingresos brutos',
                  value: formatARS(s.ingresosBrutos),
                  suffix: '',
                  target: 'Objetivo: $1.150.000+',
                  status: s.ingresosBrutos >= 1150000 ? 'green' : s.ingresosBrutos > 0 ? 'yellow' : 'red',
                },
                {
                  label: 'Calificaciones nuevas',
                  value: s.calificaciones,
                  suffix: '★',
                  target: '+2/semana objetivo',
                  status: s.calificaciones >= 2 ? 'green' : s.calificaciones > 0 ? 'yellow' : 'red',
                },
                {
                  label: 'Conversión',
                  value: `${conversion.toFixed(1)}%`,
                  suffix: '',
                  target: 'Target: >3%',
                  status: conversion >= 3 ? 'green' : conversion > 0 ? 'yellow' : 'red',
                },
              ].map(kpi => (
                <div key={kpi.label} className="flex items-center justify-between py-2 border-b border-rustico-brown/30">
                  <div>
                    <p className="font-body text-rustico-sand text-xs">{kpi.label}</p>
                    <p className="font-body text-rustico-sand text-[9px]">{kpi.target}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display text-2xl ${kpi.status === 'green' ? 'text-rustico-green' : kpi.status === 'yellow' ? 'text-rustico-gold' : 'text-rustico-sand'}`}>
                      {kpi.value}{kpi.suffix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACOS */}
          <div className={`border p-5 ${acos > 20 ? 'border-red-500 bg-red-900/10' : acos > 0 && acos <= 15 ? 'border-rustico-green bg-rustico-green/10' : 'border-rustico-brown bg-rustico-dark'}`}>
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-2">
              ACOS (Costo Pub / Venta)
            </p>
            <p className={`font-display text-5xl ${acostSt.color}`}>
              {acos > 0 ? `${acos.toFixed(1)}%` : '—'}
            </p>
            <p className={`font-body text-sm mt-2 ${acostSt.color}`}>
              {acostSt.label}
            </p>
            <div className="mt-3 text-xs font-body text-rustico-sand space-y-1">
              <p>{'<8%'} → Subir presupuesto 30%</p>
              <p>8–15% → Rango óptimo</p>
              <p>15–20% → Revisar título y foto</p>
              <p>{'>20%'} → Pausar ads</p>
            </div>
          </div>

          {/* Termómetro */}
          <div className="bg-rustico-dark border border-rustico-brown p-5">
            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-3">
              Estado del Termómetro ML
            </p>
            <div className="space-y-2">
              {[
                { label: '🔴 Sin reputación', desc: 'Menos de 10 ventas. Sin ads todavía.', active: totalVentas < 10 },
                { label: '🟡 En construcción', desc: '10–20 ventas. Empezar a testear ads.', active: totalVentas >= 10 && totalVentas < 20 },
                { label: '🟢 Termómetro verde', desc: '20+ ventas. Activar ads completo.', active: totalVentas >= 20 },
              ].map(t => (
                <div key={t.label} className={`px-3 py-2 ${t.active ? 'bg-rustico-brown/40 border-l-2 border-rustico-gold' : ''}`}>
                  <p className="font-body text-rustico-cream text-xs font-bold">{t.label}</p>
                  <p className="font-body text-rustico-sand text-xs">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
