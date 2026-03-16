'use client'

const pillars = [
  {
    title: 'IRREPETIBLE',
    description: 'Cada pieza nace una sola vez. Las vetas, los nudos y el color son tuyos — y de nadie más.',
  },
  {
    title: 'ARTESANAL',
    description: 'Sin líneas de montaje ni atajos. Cada corte, lijado y ensamble lo hace una mano con criterio.',
  },
  {
    title: 'CON HISTORIA',
    description: 'Madera recuperada que ya vivió. La transformamos en algo nuevo sin desperdiciar nada.',
  },
  {
    title: 'DE RAÍZ',
    description: 'Taller propio en La Matanza. Entrega en todo el GBA con vehículo propio, sin intermediarios.',
  },
]

function TreeSVG() {
  return (
    <svg
      viewBox="0 -4 100 122"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="vpWoodGrad" cx="45%" cy="45%" r="65%">
          <stop offset="0%"   stopColor="#e8c080"/>
          <stop offset="55%"  stopColor="#c8965a"/>
          <stop offset="100%" stopColor="#9a7040"/>
        </radialGradient>
        <linearGradient id="vpBarkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4e2810"/>
          <stop offset="18%"  stopColor="#8a5030"/>
          <stop offset="50%"  stopColor="#a86038"/>
          <stop offset="82%"  stopColor="#7a4520"/>
          <stop offset="100%" stopColor="#4e2810"/>
        </linearGradient>
      </defs>

      <style>{`
        .vp-stem {
          stroke-dasharray: 58;
          stroke-dashoffset: 58;
          animation: vp-grow-stem 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
        }
        @keyframes vp-grow-stem { to { stroke-dashoffset: 0; } }
        .vp-leaf-1 {
          opacity: 0;
          transform-origin: 50px 36px;
          animation: vp-bloom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s forwards;
        }
        .vp-leaf-2 {
          opacity: 0;
          transform-origin: 50px 22px;
          animation: vp-bloom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.75s forwards;
        }
        .vp-leaf-3 {
          opacity: 0;
          transform-origin: 50px 10px;
          animation: vp-bloom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 2.1s forwards;
        }
        @keyframes vp-bloom {
          0%   { opacity: 0; transform: scale(0) rotate(-18deg); }
          65%  { opacity: 1; transform: scale(1.2) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .vp-plant {
          transform-origin: 50px 52px;
          animation: vp-sway 5s ease-in-out 3s infinite;
        }
        @keyframes vp-sway {
          0%,  100% { transform: rotate(0deg); }
          25%        { transform: rotate(1.8deg); }
          75%        { transform: rotate(-1.8deg); }
        }
      `}</style>

      {/* Raíces */}
      <path d="M 20,87 Q 4,97  1,113 L 16,113 Q 18,103 25,95 Z"  fill="#4e2810"/>
      <path d="M 36,90 Q 25,103 23,116 L 37,116 Q 39,106 45,99 Z" fill="#4e2810"/>
      <path d="M 64,90 Q 75,103 77,116 L 63,116 Q 61,106 55,99 Z" fill="#4e2810"/>
      <path d="M 80,87 Q 96,97  99,113 L 84,113 Q 82,103 75,95 Z" fill="#4e2810"/>

      {/* Tronco */}
      <path
        d="M 13,52 Q 10,66 13,80 L 20,87 L 25,95
           Q 38,89 45,99 L 50,97 L 55,99
           Q 62,89 75,95 L 80,87 L 87,80
           Q 90,66 87,52 Z"
        fill="url(#vpBarkGrad)"
      />
      <path d="M 19,52 L 81,52 L 77,82 L 23,82 Z" fill="#a05e32" opacity="0.55"/>
      <line x1="29" y1="53" x2="26" y2="81" stroke="#3e2008" strokeWidth="1.2" opacity="0.35"/>
      <line x1="50" y1="53" x2="50" y2="81" stroke="#3e2008" strokeWidth="0.8" opacity="0.30"/>
      <line x1="71" y1="53" x2="74" y2="81" stroke="#3e2008" strokeWidth="1.2" opacity="0.35"/>

      {/* Superficie de corte */}
      <ellipse cx="50" cy="52" rx="37" ry="9"   fill="url(#vpWoodGrad)"/>
      <ellipse cx="50" cy="52" rx="28" ry="6.8" fill="none" stroke="#a07848" strokeWidth="1"   opacity="0.55"/>
      <ellipse cx="50" cy="52" rx="18" ry="4.4" fill="none" stroke="#a07848" strokeWidth="0.9" opacity="0.55"/>
      <ellipse cx="50" cy="52" rx="9"  ry="2.2" fill="none" stroke="#a07848" strokeWidth="0.8" opacity="0.55"/>

      {/* Brote animado */}
      <g className="vp-plant">
        <path
          className="vp-stem"
          d="M 50,50 C 50,40 48,23 50,2"
          stroke="#3a6318"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <g className="vp-leaf-1">
          <path d="M 50,36 C 33,30 26,13 35,7 C 39,23 46,32 50,33 Z" fill="#4a7830"/>
          <path d="M 50,36 C 67,30 74,13 65,7 C 61,23 54,32 50,33 Z" fill="#4d7d35"/>
        </g>
        <g className="vp-leaf-2">
          <path d="M 50,22 C 39,17 34,5 41,1 C 44,13 47,18 50,19 Z" fill="#4a7830"/>
          <path d="M 50,22 C 61,17 66,5 59,1 C 56,13 53,18 50,19 Z" fill="#4d7d35"/>
        </g>
        <g className="vp-leaf-3">
          <path d="M 50,10 C 44,7 41,-1 45,-3 C 47,5 48,8 50,8 Z" fill="#5a9040"/>
          <path d="M 50,10 C 56,7 59,-1 55,-3 C 53,5 52,8 50,8 Z" fill="#5a9040"/>
        </g>
      </g>
    </svg>
  )
}

export default function ValueProps() {
  return (
    <section className="relative bg-rustico-light py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">

      {/* Árbol decorativo — izquierda */}
      <div className="absolute -left-8 bottom-0 w-48 opacity-[0.06] pointer-events-none select-none">
        <TreeSVG />
      </div>

      {/* Árbol decorativo — derecha */}
      <div className="absolute -right-8 bottom-0 w-48 opacity-[0.06] pointer-events-none select-none">
        <TreeSVG />
      </div>

      {/* Árbol decorativo — centro */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-36 opacity-[0.04] pointer-events-none select-none">
        <TreeSVG />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:divide-x divide-rustico-warm">
          {pillars.map((p, i) => (
            <div key={i} className="flex flex-col items-center text-center px-8 py-10 lg:py-0 border-b lg:border-b-0 border-rustico-warm last:border-0">

              {/* Línea decorativa */}
              <div className="w-10 h-px bg-rustico-gold mb-8" />

              {/* Título */}
              <h3 className="font-display text-rustico-dark text-4xl tracking-brand mb-4">
                {p.title}
              </h3>

              {/* Descripción */}
              <p className="font-body font-light text-rustico-sand text-sm leading-relaxed max-w-xs">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
