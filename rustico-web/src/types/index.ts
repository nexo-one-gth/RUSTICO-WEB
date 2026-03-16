// ─────────────────────────────────────────────────────────────
// PRODUCTO
// ─────────────────────────────────────────────────────────────
export type ProductCategory =
  | 'aparadores'
  | 'muebles-tv'
  | 'mesas-ratona'
  | 'mesas-arrime'
  | 'consolas'
  | 'buffets'
  | 'cocina'
  | 'bano'
  | 'bar-bodega'
  | 'exterior'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  description: string
  material: string
  dimensions?: string
  finish?: string
  price?: number          // null = "Consultar precio"
  images: string[]        // paths relativos desde /public/imagenes/
  tags: string[]          // ['Pieza única', 'Hecho a mano', 'Natural']
  featured?: boolean      // aparece en la sección hero del catálogo
  available: boolean
}

// ─────────────────────────────────────────────────────────────
// LEAD (CRM)
// ─────────────────────────────────────────────────────────────
export type LeadType = 'b2c' | 'b2b'

export type LeadSource =
  | 'landing_form'
  | 'instagram_dm'
  | 'whatsapp'
  | 'facebook'
  | 'referido'
  | 'outbound'

export type LeadStage =
  | 'NUEVO'
  | 'CONTACTADO'
  | 'INTERESADO'
  | 'PROPUESTA'
  | 'NEGOCIACION'
  | 'GANADO'
  | 'PERDIDO'

export interface Lead {
  id?: string
  nombre: string
  telefono: string
  email?: string
  tipo: LeadType
  canal_origen: LeadSource
  producto_interes?: string
  mensaje?: string
  // B2B adicional
  nombre_negocio?: string
  tipo_negocio?: string
  zona?: string
  // Tracking
  etapa: LeadStage
  fecha_ingreso: string   // ISO string
  utm_source?: string
  utm_campaign?: string
  notas?: string
}

export interface LeadFormData {
  nombre: string
  telefono: string
  tipo: LeadType
  producto_interes?: string
  mensaje?: string
  // B2B
  nombre_negocio?: string
  tipo_negocio?: string
}

// ─────────────────────────────────────────────────────────────
// PEDIDO
// ─────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'PEDIDO_CREADO'
  | 'EN_PRODUCCION'
  | 'CONTROL_CALIDAD'
  | 'LISTO_DESPACHO'
  | 'EN_CAMINO'
  | 'ENTREGADO'
  | 'CANCELADO'

export interface OrderItem {
  producto: string
  categoria: ProductCategory
  cantidad: number
  precio_unitario: number
  notas_produccion?: string
  medidas_especiales?: string
}

export interface Order {
  id?: string
  lead_id: string
  cliente_nombre: string
  cliente_telefono: string
  direccion_entrega: string
  items: OrderItem[]
  subtotal: number
  envio: number
  total: number
  sena: number
  saldo: number
  estado: OrderStatus
  fecha_creacion: string
  fecha_entrega_estimada?: string
  fecha_entrega_real?: string
  notas?: string
}

// ─────────────────────────────────────────────────────────────
// API RESPONSES
// ─────────────────────────────────────────────────────────────
export interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
}
