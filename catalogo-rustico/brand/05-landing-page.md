# Rústico — Landing Page + Catálogo

> Leer `01-identidad.md`, `03-crm.md` y `04-pedidos.md` antes de este documento.
> Esta landing es el eje central del sistema — todo canal (IG, WA, Marketplace) apunta acá.

---

## Objetivo de la página

1. **Mostrar el catálogo** de productos con filtro por categoría
2. **Capturar leads** B2C y B2B → enviar al CRM automáticamente
3. **Cerrar ventas directas** — precio visible, CTA claro
4. **Ser el link en bio** de Instagram y el destino de todos los canales

---

## Stack técnico recomendado

| Capa | Tecnología | Justificación |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSG para catálogo rápido, SEO nativo |
| Estilos | Tailwind CSS | Velocidad, consistencia con design tokens |
| Animaciones | Framer Motion | Entrance animations suaves |
| Imágenes | next/image + WebP | Optimización automática |
| Formulario → CRM | API Route `/api/leads` | POST al backend CRM |
| Notificaciones | WhatsApp Business API o n8n | Trigger al operador cuando hay lead nuevo |
| Deploy | Vercel | Free tier suficiente en fase inicial |
| Analytics | Vercel Analytics + UTM params | Sin cookies, GDPR-friendly |

---

## Estructura de la página (secciones en orden)

### 1. NAVBAR
```
[Logo Rústico]                    [Aparadores] [Mesas] [TV] [Cocina] [Contacto]
                                                              [WA Button ← siempre visible]
```
- Sticky · fondo `#2c1810` · altura 64px
- Logo a la izquierda (SVG o PNG)
- Nav links en Jakarta 500 · 13px · uppercase · color `#f5f0e8` · hover `#c8a96e`
- Botón WhatsApp: fondo `#4d7d35` · texto `#faf7f2` · siempre visible en mobile

---

### 2. HERO
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   [IMAGEN FULL-BLEED — aparador-multicolor-salon.jpg]    │
│   Overlay gradient: oscuro abajo                         │
│                                                          │
│   CADA PIEZA             ← Bebas Neue 96–120px crema    │
│   TIENE UNA HISTORIA     ← Bebas Neue italic dorado      │
│                                                          │
│   Muebles únicos en madera restaurada · GBA  ← Jakarta   │
│                                                          │
│   [VER CATÁLOGO ↓]   [CONTACTAR POR WA]                 │
│   ← btn dorado            ← btn borde blanco             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Specs:**
- Altura: `100vh` en desktop · `70vh` en mobile
- Imagen: `aparador-multicolor-salon.jpg` como hero principal (o rotar con 3 imágenes)
- Overlay: `linear-gradient(to bottom, transparent 30%, rgba(44,24,16,0.9) 85%)`
- Título: Bebas Neue · 120px desktop · 64px mobile · letter-spacing 3px
- Subtítulo: Jakarta Light 300 · 18px · color `#a89880` · letter-spacing 2px
- CTA primario: fondo `#c8a96e` · texto `#2c1810` · Jakarta 700 · 14px · uppercase · padding 14px 32px
- CTA secundario: borde `1.5px solid #f5f0e8` · texto `#f5f0e8` · mismo padding

---

### 3. PROPUESTA DE VALOR (3 pilares)
```
┌──────────────┬──────────────┬──────────────┐
│  🪵           │  🤝           │  ♻️           │
│  ÚNICA        │  ARTESANAL   │  RECICLADA   │
│               │               │               │
│  Cada pieza   │  Hecha a     │  Madera que  │
│  es distinta. │  mano, sin   │  tuvo otra   │
│  Irrepetible. │  producción  │  vida.       │
│               │  en serie.   │               │
└──────────────┴──────────────┴──────────────┘
```

**Specs:**
- Fondo: `#faf7f2`
- Grid: 3 columnas desktop · 1 columna mobile
- Ícono: SVG minimalista · color `#c8a96e`
- Título pilar: Bebas Neue · 28px · `#2c1810` · letter-spacing 3px
- Descripción: Jakarta Light 300 · 14px · `#a89880` · line-height 1.8

---

### 4. CATÁLOGO DE PRODUCTOS

#### Filtros de categoría (sticky bajo el navbar en mobile)
```
[Todos] [Aparadores] [Muebles TV] [Mesas] [Cocina] [Baño] [Exterior]
```
- Diseño tipo pill / tab
- Activo: fondo `#2c1810` · texto `#c8a96e`
- Inactivo: borde `1px solid #e8dcc8` · texto `#a89880`
- Fuente: Jakarta 700 · 11px · uppercase · letter-spacing 2px

#### Grid de productos
- 3 columnas desktop · 2 columnas tablet · 1 columna mobile
- Gap: 24px
- Max-width: 1200px centrado

#### Card de producto
```
┌────────────────────┐
│                    │
│  [IMAGEN 4:3]      │  ← object-fit: cover
│                    │
│  Tag: PIEZA ÚNICA  │  ← borde dorado, Jakarta 700, 9px uppercase
│                    │
│  Aparador          │  ← Jakarta 500, 18px, #2c1810
│  Multicolor        │
│                    │
│  Madera restaurada │  ← Jakarta 300, 13px, #a89880
│  · Hecho a mano    │
│                    │
│  ──────────────── │  ← 1px solid #e8dcc8
│                    │
│  CONSULTAR PRECIO  │  ← Bebas Neue 20px, #5c3d2e
│  [CONTACTAR →]     │  ← btn bg #2c1810, texto #c8a96e
└────────────────────┘
```

**Hover de card:**
- Imagen: `scale(1.03)` · transition 300ms ease
- Border: `1px solid #c8a96e`
- Sombra: `0 24px 64px rgba(44,24,16,0.18)`

**Click en card → Modal o página de detalle:**
- Galería de imágenes (múltiples fotos del mismo producto)
- Specs completos (medidas, material, acabado)
- Precio (si está definido) o botón "Consultar precio"
- CTA principal: botón WhatsApp + formulario rápido → CRM

#### Productos a mostrar (imágenes disponibles)

```
Aparadores (17 imágenes):
  aparador-multicolor-salon.jpg     ← hero de categoría
  aparador-arcoiris-completo.jpg
  aparador-natural-living.jpg
  aparador-turquesa-rustico.jpg
  aparador-verde-cajones.jpg
  [+ 12 más]

Muebles TV (12 imágenes):
  mueble-tv-rustico-living.jpg      ← hero de categoría
  mueble-tv-multicolor-living.jpg
  conjunto-tv-vitrinas-living.jpg
  [+ 9 más]

Mesas Ratona (9 imágenes):
  mesa-ratona-living-flores.jpg     ← hero de categoría
  mesa-ratona-chimenea.jpg
  [+ 7 más]

Mesas de Arrime (1 imagen):
  mesa-arrime-atelier-blanca-living.jpg

Cocina (3 imágenes):
  isla-cocina-azul-provenzal.jpg    ← hero
  isla-cocina-ruedas.jpg
  isla-multicolor-exterior.jpg

Baño (2 imágenes):
  vanitory-rustico-bacha-blanca.jpg
  vanitory-rustico-bacha-bol.jpg

Exterior (4 imágenes):
  consola-rustica-exterior.jpg      ← hero
  mueble-tv-rustico-exterior.jpg
  [+ 2 más]

Bar / Bodega (3 imágenes):
  mueble-bar-bodega-taller.jpg
  mueble-bodega-taller.jpg
  mesa-bar-taburetes.jpg
```

---

### 5. SECCIÓN B2B (para mueblerías y locales)
```
┌──────────────────────────────────────────────────────────┐
│  Fondo: #2c1810                                          │
│                                                          │
│  PARA NEGOCIOS          ← Bebas Neue 56px crema          │
│  Y REVENDEDORES                                          │
│                                                          │
│  Trabaja con nosotros al por mayor.                      │
│  Descuento 15–20% · Consignación · Exclusividad de zona  │
│                                                          │
│  [✓] Descuento desde 5 unidades                          │
│  [✓] Entrega en GBA                                      │
│  [✓] Muebles a medida                                    │
│  [✓] Stock disponible                                     │
│                                                          │
│  [QUIERO SER REVENDEDOR →]   ← btn dorado                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Click en CTA B2B → Modal con formulario B2B:**
- Nombre · Negocio · Teléfono · Zona · Tipo de negocio · Mensaje
- Submit → POST `/api/leads` con `tipo: "b2b"`
- Trigger WhatsApp al operador con alerta "🏪 LEAD B2B"

---

### 6. PROCESO / HISTORIA (storytelling)
```
┌──────────────────────────────────────────────────────────┐
│  Fondo: #faf7f2                                          │
│                                                          │
│  LA MADERA        ← Bebas Neue 56px, centrado            │
│  YA VIVIÓ         ← Bebas Neue italic dorado             │
│                                                          │
│  Timeline visual del proceso:                            │
│  [MADERA RESCATADA] → [TALLER] → [DISEÑO] → [TU HOGAR]  │
│                                                          │
│  [Foto del taller / proceso si disponible]               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### 7. FORMULARIO DE CONTACTO / CTA FINAL
```
┌──────────────────────────────────────────────────────────┐
│  Fondo: #e8dcc8                                          │
│                                                          │
│  ¿ENCONTRASTE        ← Bebas Neue 56px                   │
│  TU PIEZA?                                               │
│                                                          │
│  Nombre ___________________                              │
│  Teléfono _________________  ← WhatsApp para notif       │
│  ¿Qué buscás? _____________                              │
│  ○ Consumidor final   ○ Negocio / Revendedor             │
│                                                          │
│  [QUIERO QUE ME CONTACTEN →]  ← btn #2c1810 con dorado  │
│                                                          │
│  O escribinos directo al WA → [BOTÓN WHATSAPP]           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Submit → POST `/api/leads`:**
```json
{
  "nombre": "...",
  "telefono": "...",
  "producto_interes": "...",
  "tipo": "b2c | b2b",
  "canal_origen": "landing_form",
  "utm_source": "..."
}
```
→ Crear lead en CRM con estado `NUEVO`
→ Notificación inmediata al operador por WhatsApp

---

### 8. FOOTER
```
┌──────────────────────────────────────────────────────────┐
│  Fondo: #2c1810                                          │
│                                                          │
│  [Logo Rústico]                                          │
│  Muebles únicos de madera restaurada · GBA               │
│                                                          │
│  [Instagram]  [Facebook]  [WhatsApp]                     │
│                                                          │
│  © 2025 Rústico · Todos los derechos reservados          │
└──────────────────────────────────────────────────────────┘
```

---

## SEO

| Elemento | Valor |
|---|---|
| `<title>` | Rústico — Muebles Únicos de Madera Restaurada · GBA |
| `meta description` | Fábrica de muebles artesanales en madera reciclada. Piezas únicas, estilo rústico-campo. Entrega en GBA. Precio de fábrica directo. |
| Keywords | muebles reciclados, muebles rústicos, aparador madera, GBA, muebles artesanales, madera restaurada |
| OG image | `aparador-multicolor-salon.jpg` (1200×630) |
| Schema.org | `LocalBusiness` + `Product` por cada item del catálogo |

---

## Performance

- Imágenes en WebP · lazy loading
- LCP target: < 2.5s
- CLS: 0 (reservar espacio para imágenes con aspect-ratio)
- TTFB: < 200ms (Vercel Edge)
- Sin Google Analytics (Vercel Analytics sin cookies)
