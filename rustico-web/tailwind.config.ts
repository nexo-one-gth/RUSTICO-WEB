import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── BRAND COLORS ─────────────────────────────────────────
      colors: {
        rustico: {
          dark:   '#2c1810',   // fondo principal / headers
          brown:  '#5c3d2e',   // marrón tierra
          gold:   '#c8a96e',   // acento principal ⭐
          green:  '#4d7d35',   // verde logo (brote)
          olive:  '#6b7a35',   // verde oliva
          cream:  '#f5f0e8',   // texto sobre oscuro
          warm:   '#e8dcc8',   // fondos secundarios
          light:  '#faf7f2',   // fondo base
          text:   '#3a2a1e',   // texto corrido
          sand:   '#a89880',   // texto secundario / subtítulos
        },
      },

      // ── TIPOGRAFÍA ───────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],   // Bebas Neue → títulos, precios
        body:    ['var(--font-jakarta)', 'sans-serif'],  // Plus Jakarta Sans → UI
      },

      // ── LETTER SPACING ───────────────────────────────────────
      letterSpacing: {
        'brand':   '0.2em',
        'brand-sm': '0.15em',
        'brand-xs': '0.08em',
      },

      // ── SHADOWS ──────────────────────────────────────────────
      boxShadow: {
        'card':   '0 24px 64px rgba(44, 24, 16, 0.12)',
        'card-hover': '0 32px 80px rgba(44, 24, 16, 0.22)',
        'dark':   '0 32px 64px rgba(0, 0, 0, 0.5)',
      },

      // ── BORDER RADIUS ────────────────────────────────────────
      // La marca usa bordes rectos — override de los defaults
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px', // solo para highlights/avatares
      },

      // ── ANIMACIONES ──────────────────────────────────────────
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
    },
  },
  plugins: [],
}

export default config
