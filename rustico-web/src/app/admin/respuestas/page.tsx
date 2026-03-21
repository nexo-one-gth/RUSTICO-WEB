'use client'

import { useState } from 'react'

type Categoria = 'medidas' | 'materiales' | 'precio' | 'envio' | 'tiempo' | 'objeciones' | 'upsell'

interface Respuesta {
  pregunta: string
  respuesta: string
}

const banco: Record<Categoria, { label: string; items: Respuesta[] }> = {
  medidas: {
    label: 'Medidas',
    items: [
      {
        pregunta: '¿Cuáles son las medidas exactas?',
        respuesta: `¡Hola! Las medidas son:

RACK TV: [CM] largo x [CM] alto x [CM] profundidad
MESA RATONA: [CM] x [CM] x [CM] alto
MESA DE ARRIME: [CM] x [CM] x [CM] alto

¿Necesitás que las adapte a tu espacio?
Trabajamos por encargo y podemos personalizar 🙌`,
      },
      {
        pregunta: '¿Entra en un living de X metros?',
        respuesta: `¡Hola! Para orientarte mejor, ¿podés decirme las
medidas de tu espacio? Así te confirmo si entra bien
o si conviene ajustar alguna medida 🪵`,
      },
    ],
  },
  materiales: {
    label: 'Materiales',
    items: [
      {
        pregunta: '¿De qué madera es?',
        respuesta: `La madera es [pino/paraíso/reciclada] tratada con aceite de lino.
Es madera sólida, no MDF ni melamina.
Las vetas y el color son únicos en cada pieza 🌿`,
      },
      {
        pregunta: '¿El hierro se oxida?',
        respuesta: `El hierro tiene acabado [epoxy/pintura al horno] que
lo protege en condiciones normales de interior.

Para exterior sí recomendamos protector anticorrosivo.
¿Va a ir en interior? 🙌`,
      },
    ],
  },
  precio: {
    label: 'Precio y Pago',
    items: [
      {
        pregunta: '¿Tienen descuento al contado?',
        respuesta: `¡Hola! Por pago al contado en efectivo o transferencia
podemos hacer un arreglo. Escribinos al privado
o al WhatsApp [NÚMERO] para coordinarlo 🙌`,
      },
      {
        pregunta: '¿Aceptan cuotas?',
        respuesta: `¡Sí! A través de Mercado Libre podés pagar en
hasta [X] cuotas sin interés con todas las tarjetas.

La cuota quedaría en $[CUOTA] x [X] 💳`,
      },
    ],
  },
  envio: {
    label: 'Envío',
    items: [
      {
        pregunta: '¿Hacen envío a mi zona?',
        respuesta: `¡Hola! Sí, entregamos en AMBA y CABA 🚚

Para cotizarte el flete necesito la localidad.
El costo lo acordamos antes de confirmar.
¿En qué zona estás?`,
      },
      {
        pregunta: '¿Cuánto sale el flete?',
        respuesta: `El flete depende de la distancia desde nuestro taller
en González Catán, GBA Oeste.

Para cotizarlo necesito tu localidad/barrio 📍
¿De dónde sos?`,
      },
    ],
  },
  tiempo: {
    label: 'Tiempo de fabricación',
    items: [
      {
        pregunta: '¿Cuánto tarda?',
        respuesta: `Fabricamos por encargo:
⏱️ Fabricación: [X] días hábiles
🚚 Coordinamos entrega al terminar

Una vez confirmado el pago, empezamos 🙌`,
      },
      {
        pregunta: '¿Tienen stock o es por encargo?',
        respuesta: `Trabajamos principalmente por encargo para
garantizar la calidad de cada pieza.

Actualmente: [tenemos X unidades / es por encargo].
¿Te interesa encargar el tuyo? 🪵`,
      },
    ],
  },
  objeciones: {
    label: 'Objeciones',
    items: [
      {
        pregunta: '"Es muy caro para lo que es"',
        respuesta: `Entiendo la percepción. La diferencia está en:

🪵 Madera sólida (no MDF ni melamina)
🔩 Hierro soldado a mano (no atornillado)
✋ Fabricación artesanal en Argentina
♾️ Durabilidad real — muebles para décadas

¿Puedo mostrarte fotos de detalle? 🙌`,
      },
      {
        pregunta: '"Vi algo más barato en otra publicación"',
        respuesta: `Entiendo que hay opciones más económicas.
La diferencia está en los materiales y la fabricación.

Los nuestros son madera sólida y hierro real,
no aglomerados ni tubos delgados.

¿Querés visitarnos en el showroom de Morón
para verlo en persona antes de decidir? 🙌`,
      },
    ],
  },
  upsell: {
    label: 'Upsell',
    items: [
      {
        pregunta: 'Cliente pregunta solo por el Rack',
        respuesta: `¡Hola! El Rack TV está disponible a $[PRECIO].

Una cosa que muchos clientes terminan eligiendo
es el Combo Living completo (Rack + Ratona + Arrime).
Las 3 piezas están diseñadas juntas y combinan perfecto.
El combo tiene mejor precio que las 3 por separado.

¿Querés que te pase el precio del combo para comparar? 🙌`,
      },
      {
        pregunta: 'Cliente listo para confirmar',
        respuesta: `¡Perfecto! Antes de confirmar, podemos agregar:

➕ Estante extra en el Rack: $[PRECIO]
➕ Rueditas en la Mesa Ratona: $[PRECIO]
➕ Acabado especial en la madera: $[PRECIO]

¿Te suma alguna? Si no, también lo hacemos
tal como está en la publicación 🙌`,
      },
    ],
  },
}

const categoriaLabels: Record<Categoria, string> = {
  medidas: 'Medidas',
  materiales: 'Materiales',
  precio: 'Precio',
  envio: 'Envío',
  tiempo: 'Tiempo',
  objeciones: 'Objeciones',
  upsell: 'Upsell',
}

function CopyCard({ pregunta, respuesta }: Respuesta) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(respuesta)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-[#1a1008] border border-rustico-brown p-4 mb-3">
      <p className="font-body text-rustico-gold text-xs font-bold mb-3">{pregunta}</p>
      <pre className="font-body text-rustico-cream text-xs whitespace-pre-wrap leading-relaxed mb-3">
        {respuesta}
      </pre>
      <button
        onClick={copy}
        className={`font-body text-[9px] tracking-brand-sm uppercase px-3 py-1 transition-colors
          ${copied ? 'bg-rustico-green text-white' : 'bg-rustico-brown text-rustico-cream hover:bg-rustico-gold hover:text-rustico-dark'}`}
      >
        {copied ? '✓ Copiado' : 'Copiar respuesta'}
      </button>
    </div>
  )
}

export default function RespuestasPage() {
  const [cat, setCat] = useState<Categoria>('medidas')

  return (
    <div className="p-6 min-h-screen bg-[#1a1008]">
      <div className="mb-8">
        <p className="font-body text-rustico-sand text-xs tracking-brand-sm uppercase mb-1">
          Agente 9
        </p>
        <h1 className="font-display text-4xl text-rustico-cream tracking-brand-xs">
          BANCO DE RESPUESTAS ML
        </h1>
        <p className="font-body text-rustico-sand text-sm mt-1">
          Respuestas listas para copiar y pegar en Mercado Libre
        </p>
      </div>

      <div className="flex gap-1 flex-wrap mb-6">
        {(Object.keys(categoriaLabels) as Categoria[]).map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-2 font-body font-bold text-[10px] tracking-brand-sm uppercase transition-colors
              ${cat === c
                ? 'bg-rustico-gold text-rustico-dark'
                : 'border border-rustico-brown text-rustico-sand hover:text-rustico-cream hover:border-rustico-gold'
              }`}
          >
            {categoriaLabels[c]}
          </button>
        ))}
      </div>

      <div>
        {banco[cat].items.map((item, i) => (
          <CopyCard key={i} {...item} />
        ))}
      </div>

      <div className="mt-4 bg-rustico-dark border border-rustico-brown p-4">
        <p className="font-body text-rustico-sand text-xs">
          ⏱️ <strong className="text-rustico-cream">Objetivo de respuesta:</strong> menos de 1 hora.
          Cada hora de demora reduce la probabilidad de venta en un 30%.
        </p>
      </div>
    </div>
  )
}
