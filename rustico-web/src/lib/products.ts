import { Product, ProductCategory } from '@/types'

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'aparadores':   'Varios',
  'muebles-tv':   'Rack TV',
  'mesas-ratona': 'Mesas Ratona',
  'mesas-arrime': 'Mesas de Arrime',
  'consolas':     'Consolas',
  'buffets':      'Buffets',
  'cocina':       'Cocina',
  'bano':         'Baño',
  'bar-bodega':   'Bar & Bodega',
  'exterior':     'Exterior',
}

export const products: Product[] = [

  // ── MESAS DE ARRIME ───────────────────────────────────────
  {
    id: 'mesa-arrime-natural-cajones',
    name: 'Mesa de Arrime Natural',
    category: 'mesas-arrime',
    description: 'Líneas simples, textura real, historia en cada veta. Madera que fue cajón de fruta, ahora la pieza que le falta a tu living.',
    material: 'Madera reciclada con acabado natural',
    tags: ['Pieza Única', 'Natural', 'Hecho a Mano'],
    images: [
      'mesa-arrime-frente-cajones.jpg',
      'mesa-arrime-natural-cesta.jpg',
      'mesa-arrime-natural-puertas.jpg',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'mesa-arrime-rustica-cajones',
    name: 'Mesa de Arrime Rústica',
    category: 'mesas-arrime',
    description: 'Cajones amplios, madera con historia. Para el que quiere funcionalidad y carácter en el mismo mueble.',
    material: 'Madera reciclada con acabado rústico natural',
    tags: ['Pieza Única', 'Hecho a Mano'],
    images: [
      'mesa-arrime-rustica-cajones.jpg',
      'mesa-arrime-frente-cajones.jpg',
    ],
    available: true,
  },
  {
    id: 'mesa-arrime-verde-baldas',
    name: 'Mesa de Arrime Verde',
    category: 'mesas-arrime',
    description: 'Verde campo, estantes abiertos. El color del brote que le da identidad a Rústico.',
    material: 'Madera reciclada pintada en verde natural',
    tags: ['Pieza Única', 'Verde', 'Hecho a Mano'],
    images: ['mesa-arrime-verde-baldas.jpg'],
    available: true,
  },
  {
    id: 'mesa-arrime-multicolor',
    name: 'Mesa de Arrime Multicolor',
    category: 'mesas-arrime',
    description: 'Cajones con colores que cuentan historias distintas. Cada gaveta es una paleta diferente.',
    material: 'Madera reciclada con terminación multicolor',
    tags: ['Pieza Única', 'Multicolor', 'Hecho a Mano'],
    images: [
      'mesa-arrime-new-1.jpeg',
      'mesa-arrime-new-2.jpeg',
      'mesa-arrime-new-3.jpeg',
      'mesa-arrime-new-4.jpeg',
      'mesa-arrime-new-5.jpeg',
    ],
    featured: true,
    available: true,
  },

  // ── RACK TV ───────────────────────────────────────────────
  {
    id: 'rack-tv-turquesa-fucsia',
    name: 'Rack TV Turquesa & Fucsia',
    category: 'muebles-tv',
    description: 'El living que se anima a tener personalidad. Dos colores que no piden permiso.',
    material: 'Madera reciclada, pintada en turquesa y fucsia',
    tags: ['Pieza Única', 'Multicolor', 'Hecho a Mano'],
    images: [
      'rack-tv-turquesa-fucsia-01.jpg',
      'rack-tv-turquesa-fucsia-02.jpg',
      'rack-tv-turquesa-fucsia-03.jpg',
      'rack-tv-turquesa-lateral.jpg',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'rack-tv-industrial',
    name: 'Rack TV Industrial',
    category: 'muebles-tv',
    description: 'Estructura robusta, estantes amplios y ese carácter industrial que define un espacio. Para televisores hasta 65".',
    material: 'Madera reciclada con estructura de hierro',
    tags: ['Industrial', 'Hecho a Mano'],
    images: [
      'rack-tv-new-1.jpeg',
      'rack-tv-new-2.jpeg',
      'rack-tv-new-3.jpeg',
      'rack-tv-new-4.jpeg',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'rack-tv-natural',
    name: 'Rack TV Natural',
    category: 'muebles-tv',
    description: 'Acabado natural que resalta la veta original de la madera. Sobrio, duradero y con carácter propio.',
    material: 'Madera reciclada con acabado natural',
    tags: ['Natural', 'Hecho a Mano'],
    images: ['rack-tv-natural.jpg'],
    available: true,
  },

  // ── MESAS RATONA ──────────────────────────────────────────
  {
    id: 'mesa-ratona-rustica',
    name: 'Mesa Ratona Rústica',
    category: 'mesas-ratona',
    description: 'Baja, sólida y con toda la textura de la madera reciclada. La mesa de centro que ancla el living.',
    material: 'Madera reciclada con acabado rústico',
    tags: ['Pieza Única', 'Hecho a Mano'],
    images: [
      'mesa-ratona.jpg',
      'mesa-ratona-2.jpg',
    ],
    featured: true,
    available: true,
  },

  // ── VITRINAS / APARADORES ─────────────────────────────────
  {
    id: 'vitrina-rustica',
    name: 'Vitrina Rústica',
    category: 'aparadores',
    description: 'Puertas con vidrio, estructura de madera reciclada. Para exhibir con carácter lo que vale la pena mostrar.',
    material: 'Madera reciclada con vidrio',
    tags: ['Pieza Única', 'Hecho a Mano'],
    images: [
      'vitrina-1.jpg',
      'vitrina-2.jpg',
    ],
    available: true,
  },

  // ── COCINA ────────────────────────────────────────────────
  {
    id: 'mueble-cocina',
    name: 'Mueble de Cocina',
    category: 'cocina',
    description: 'Funcionalidad y carácter en la cocina. Espacios de almacenamiento con ese acabado rústico que transforma cualquier ambiente.',
    material: 'Madera reciclada con acabado resistente a la humedad',
    tags: ['Hecho a Mano', 'Funcional'],
    images: ['cocina.jpg'],
    available: true,
  },

  // ── BAÑO ──────────────────────────────────────────────────
  {
    id: 'mueble-bano',
    name: 'Mueble de Baño',
    category: 'bano',
    description: 'El baño también merece historia. Mueble en madera reciclada con tratamiento especial anti-humedad.',
    material: 'Madera reciclada con tratamiento anti-humedad',
    tags: ['Hecho a Mano', 'Anti-humedad'],
    images: [
      'bano.jpg',
      'bano-2.jpg',
    ],
    available: true,
  },

  // ── REFERENCIAS / VARIOS ──────────────────────────────────
  {
    id: 'referencia-varios',
    name: 'Colección Varios',
    category: 'aparadores',
    description: 'Una selección de piezas únicas de nuestro taller. Muebles con historia propia, listos para tu espacio.',
    material: 'Madera reciclada, distintos acabados y colores',
    tags: ['Colección', 'Varios Estilos'],
    images: [
      'referencia-varios-01.jpg',
      'referencia-varios-02.jpg',
      'referencia-varios-03.jpg',
      'referencia-varios-04.jpg',
    ],
    available: true,
  },
]

// ── HELPERS ──────────────────────────────────────────────────

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category && p.available)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.available)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[]
