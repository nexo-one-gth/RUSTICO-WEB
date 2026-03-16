# Rústico — Identidad de Marca

> **Documento base.** Todo desarrollador, diseñador o generador de contenido que construya cualquier módulo de este sistema debe leer este archivo primero.

---

## 1. Nombre y posicionamiento

| Campo | Valor |
|---|---|
| Nombre comercial | **Rústico** |
| Subtítulo | Muebles Únicos de Madera Restaurada |
| Tagline corto | *Cada pieza tiene una historia* |
| Categoría | Fábrica artesanal de muebles reciclados, estilo rústico-campo contemporáneo |
| Ubicación | Gran Buenos Aires, Argentina |
| Canal principal | Direct-to-consumer (B2C) + Mayorista B2B |

---

## 2. Paleta de colores

### Colores primarios

| Nombre | HEX | RGB | Uso |
|---|---|---|---|
| **Oscuro Tierra** | `#2c1810` | 44 · 24 · 16 | Fondos principales, headers, texto sobre claro |
| **Dorado Atelier** | `#c8a96e` | 200 · 169 · 110 | Acento principal, CTAs primarios, highlights, precio |
| **Verde Logo** | `#4d7d35` | 77 · 125 · 53 | Acento secundario, tags naturales, badges |

### Colores secundarios

| Nombre | HEX | RGB | Uso |
|---|---|---|---|
| Marrón Tierra | `#5c3d2e` | 92 · 61 · 46 | Bordes, hover states, texto medio |
| Crema Cálida | `#f5f0e8` | 245 · 240 · 232 | Texto sobre fondos oscuros |
| Beige Warm | `#e8dcc8` | 232 · 220 · 200 | Fondos de sección, cards secundarias |
| Blanco Roto | `#faf7f2` | 250 · 247 · 242 | Fondo base de landing page |
| Texto Cuerpo | `#3a2a1e` | 58 · 42 · 30 | Texto corrido principal |
| Muted Sand | `#a89880` | 168 · 152 · 128 | Texto secundario, subtítulos, dims |
| Verde Oliva | `#6b7a35` | 107 · 122 · 53 | Variante del verde para fondos |

### Reglas de uso de color

- El **dorado** `#c8a96e` es el color firma. Siempre presente en el UI, nunca ausente.
- El **verde** `#4d7d35` complementa al dorado. Nunca lo reemplaza como primario.
- El **oscuro** `#2c1810` es el negro de la marca — no usar negro puro `#000`.
- Nunca usar blanco puro `#ffffff` como fondo — usar `#faf7f2`.
- En fondos oscuros: texto en `#f5f0e8` (nunca blanco puro).

---

## 3. Tipografía

### Sistema tipográfico

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| **Display / Precio** | Bebas Neue | Regular (único) | Precios, números grandes, CTAs de impacto, titulares hero |
| **Body / UI** | Plus Jakarta Sans | Light 300 / Regular 400 / Medium 500 / Bold 700 | Todo el texto corrido, labels, botones, descripción de producto |

### Disponibilidad

- Bebas Neue → Google Fonts ✓ · Canva ✓ · npm `@fontsource/bebas-neue` ✓
- Plus Jakarta Sans → Google Fonts ✓ · Canva ✓ · npm `@fontsource/plus-jakarta-sans` ✓

### Jerarquía tipográfica (web)

```
Hero Title (Bebas Neue):     72–120px  · letter-spacing: 2–4px
Section Title (Bebas Neue):  40–56px   · letter-spacing: 1–2px
Product Name (Jakarta 500):  20–28px
Price (Bebas Neue):          40–64px   · color: #c8a96e
Label / Tag (Jakarta 700):   11–13px   · letter-spacing: 3–5px · UPPERCASE
Body (Jakarta 300–400):      14–16px   · line-height: 1.7
Button (Jakarta 700):        12–14px   · letter-spacing: 2px · UPPERCASE
Caption (Jakarta 300):       11–12px   · color: #a89880
```

### Integración CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;700&display=swap');

:root {
  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'Plus Jakarta Sans', sans-serif;
}
```

---

## 4. Logo

- Archivo fuente: `imagenes/LOGO.jpeg`
- Descripción: Tronco con brote emergente + wordmark "Rústico" en script marrón
- El brote verde del logo es el origen del color `#4d7d35`
- Versiones requeridas:
  - Sobre fondo oscuro `#2c1810` → wordmark en `#f5f0e8`, brote en `#4d7d35`
  - Sobre fondo claro `#faf7f2` → wordmark en `#2c1810`, brote en `#4d7d35`
  - Ícono solo (tronco+brote) → para favicon, app icon, highlights

---

## 5. Voz de marca

### Personalidad

| Atributo | Descripción |
|---|---|
| Auténtico | No vende humo. Dice lo que es. |
| Artesanal | Habla de proceso, materiales, historia de la madera |
| Directo | Sin rodeos. Precio visible. Envío claro. |
| Cálido | Tono de persona, no de corporación |
| Orgulloso | Cada pieza es única — lo sabe y lo dice |

### Vocabulario de marca — palabras a usar

`único · irrepetible · restaurado · artesanal · historia · madera · taller · hecho a mano · natural · proceso · pieza · origen`

### Palabras a evitar

`económico · barato · oferta · descuento · liquidación · el mejor · premium` (no lo somos en precio, sí en calidad)

### Tono por canal

| Canal | Tono |
|---|---|
| Landing page | Evocador + directo. Precio visible. |
| Instagram | Emocional, inspiracional, storytelling del proceso |
| WhatsApp | Conversacional, cercano, breve |
| B2B / Propuesta comercial | Profesional, datos, condiciones claras |
| CRM / Seguimiento | Directo, no invasivo, recordatorio amigable |

---

## 6. Imágenes y fotografía

### Biblioteca de producto
Ubicada en `imagenes-catalogo/` — 67 imágenes de productos en contexto.

### Estilo fotográfico
- Fondos neutros o naturales (pared blanca, beige, piedra, madera clara)
- Luz natural, lateral, que resalte la textura de la madera
- Elementos decorativos simples (vela, planta pequeña, libro)
- Ratio preferido: **4:5** para feed · **9:16** para stories · **1:1** para highlights
- Edición mínima: +contraste · +warmth (temperatura cálida) · sin filtros artificiales

### Categorías de producto disponibles

| Categoría | Ejemplos de imagen |
|---|---|
| Aparadores | aparador-multicolor-*, aparador-natural-*, aparador-turquesa-* |
| Muebles TV | mueble-tv-rustico-*, mueble-tv-multicolor-*, conjunto-tv-* |
| Mesas ratona | mesa-ratona-living-*, mesa-ratona-chimenea-* |
| Mesas de arrime | mesa-arrime-atelier-blanca-living |
| Consolas | consola-rustica-*, consola-naranja-* |
| Buffets | buffet-crema-*, buffet-multicolor-* |
| Islas de cocina | isla-cocina-*, isla-multicolor-* |
| Vanitorios | vanitory-rustico-* |
| Bar / Bodega | mueble-bar-*, mueble-bodega-* |
| Exterior | consola-rustica-exterior, mueble-tv-rustico-exterior |

---

## 7. Iconografía y elementos gráficos

- **Separadores**: línea horizontal `1px solid #c8a96e` o `1px dashed #e0d8cc`
- **Bordes de cards**: `1px solid #e8dcc8` — nunca sombra de color, siempre neutra
- **Sombras**: `0 24px 64px rgba(44, 24, 16, 0.12)` — sombra cálida marrón
- **Border radius**: 0px — sin redondeo. La marca es rústica, los bordes son rectos.
- **Badges / Tags**: borde fino `1px` en color del texto, mayúsculas, letter-spacing 3px
- **Botón primario**: fondo `#c8a96e`, texto `#2c1810`, Bebas Neue o Jakarta 700 uppercase
- **Botón secundario**: borde `1px #2c1810`, fondo transparente, texto `#2c1810`
- **Botón verde**: fondo `#4d7d35`, texto `#faf7f2` — solo para acciones de tipo "confirmar / disponible"

---

## 8. Contexto del negocio (resumen para desarrolladores)

- **Capacidad**: ~100 muebles/mes
- **Ticket B2C**: $100.000–$160.000 ARS por pieza
- **Canal B2B**: mueblerías, bares, restós, decoradores
- **Zona**: Gran Buenos Aires + CABA
- **Meta 90 días**: 10-15 clientes B2B · $10M/mes facturación
- **Stack digital**: Instagram · Facebook Marketplace · WhatsApp · Landing page (a construir) · CRM (a construir)
- **Operación**: 1 socio, cero presupuesto publicitario, IA como co-piloto

Ver contexto completo en: `../skills-muebles-reciclados/skills-muebles/analizador-metricas/references/contexto-negocio.md`
