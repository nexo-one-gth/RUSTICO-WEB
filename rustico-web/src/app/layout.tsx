import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rustico-prod--rustic0.us-central1.hosted.app'),
  title: 'Rústico — Muebles Únicos de Madera Restaurada · GBA',
  description:
    'Fábrica de muebles artesanales en madera reciclada. Piezas únicas, estilo rústico-campo. Entrega en GBA. Precio de fábrica directo.',
  keywords: [
    'muebles reciclados', 'muebles rústicos', 'aparador madera', 'GBA',
    'muebles artesanales', 'madera restaurada', 'muebles únicos',
    'muebles campo', 'decoración rústica',
  ],
  openGraph: {
    title: 'Rústico — Muebles Únicos de Madera Restaurada',
    description: 'Cada pieza tiene una historia. Muebles artesanales en madera reciclada, GBA.',
    images: [{ url: '/imagenes/aparador-multicolor-salon.jpg', width: 1200, height: 630 }],
    locale: 'es_AR',
    type: 'website',
    siteName: 'Rústico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rústico — Muebles Únicos de Madera Restaurada',
    description: 'Cada pieza tiene una historia. Muebles artesanales en madera reciclada, GBA.',
    images: ['/imagenes/aparador-multicolor-salon.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-rustico-light text-rustico-text antialiased">
        {children}
      </body>
    </html>
  )
}
