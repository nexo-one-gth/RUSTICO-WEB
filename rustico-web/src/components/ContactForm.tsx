'use client'
import { useState } from 'react'
import { LeadFormData } from '@/types'
import clsx from 'clsx'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491128054509'

const INITIAL: LeadFormData = {
  nombre: '',
  telefono: '',
  tipo: 'b2c',
  producto_interes: '',
  mensaje: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<LeadFormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al enviar')

      setStatus('success')
      setForm(INITIAL)
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section id="contacto" className="bg-rustico-warm py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">Contacto</p>
          <h2 className="font-display text-rustico-dark text-[clamp(40px,7vw,64px)] tracking-brand-xs leading-none mb-4">
            ¿ENCONTRASTE<br />TU PIEZA?
          </h2>
          <p className="font-body font-light text-rustico-text/70 text-sm">
            Dejanos tus datos y te contactamos a la brevedad.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-12 border border-rustico-gold bg-rustico-light">
            <p className="font-display text-rustico-gold text-5xl tracking-brand mb-4">¡GRACIAS!</p>
            <p className="font-body text-rustico-text text-sm">
              Recibimos tu consulta. Te contactamos dentro de las próximas 2 horas hábiles.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn-secondary mt-8"
            >
              Enviar otra consulta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre + Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-text/60 mb-2">
                  Nombre *
                </label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-text/60 mb-2">
                  WhatsApp *
                </label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  type="tel"
                  placeholder="+54 9 11 XXXX XXXX"
                  className="form-input"
                />
              </div>
            </div>

            {/* Tipo de cliente */}
            <div>
              <label className="block font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-text/60 mb-2">
                Soy...
              </label>
              <div className="flex gap-4">
                {[
                  { value: 'b2c', label: 'Consumidor final' },
                  { value: 'b2b', label: 'Negocio / Revendedor' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={clsx(
                      'flex-1 flex items-center justify-center gap-2 py-3 px-4 border cursor-pointer transition-colors duration-300 font-body font-medium text-sm',
                      form.tipo === opt.value
                        ? 'border-rustico-gold bg-rustico-dark text-rustico-gold'
                        : 'border-rustico-brown/30 text-rustico-text/60 hover:border-rustico-gold'
                    )}
                  >
                    <input
                      type="radio"
                      name="tipo"
                      value={opt.value}
                      checked={form.tipo === opt.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Tipo de negocio (solo B2B) */}
            {form.tipo === 'b2b' && (
              <div>
                <label className="block font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-text/60 mb-2">
                  Tipo de negocio
                </label>
                <select
                  name="tipo_negocio"
                  value={form.tipo_negocio ?? ''}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Seleccioná una opción...</option>
                  <option value="muebleria">Mueblería / Tienda de muebles</option>
                  <option value="decoracion">Local de decoración / Bazar</option>
                  <option value="gastronomia">Bar / Restaurante / Cervecería</option>
                  <option value="revendedor">Revendedor / Dropshipper</option>
                  <option value="arquitecto">Estudio de arquitectura / Diseño</option>
                  <option value="desarrollador">Desarrollador inmobiliario / Home staging</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            )}

            {/* Producto de interés */}
            <div>
              <label className="block font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-text/60 mb-2">
                ¿Qué mueble te interesa?
              </label>
              <input
                name="producto_interes"
                value={form.producto_interes}
                onChange={handleChange}
                placeholder="Aparador, mesa ratona, mueble TV..."
                className="form-input"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block font-body font-bold text-[10px] tracking-brand-sm uppercase text-rustico-text/60 mb-2">
                Mensaje (opcional)
              </label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={3}
                placeholder="Medidas especiales, colores, zona de entrega..."
                className="form-input resize-none"
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="font-body text-red-500 text-sm">{errorMsg}</p>
            )}

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary flex-1 text-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando...' : 'Quiero que me contacten →'}
              </button>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola!%20Quiero%20consultar%20sobre%20un%20mueble`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-center"
              >
                O escribir por WA
              </a>
            </div>

          </form>
        )}

      </div>
    </section>
  )
}
