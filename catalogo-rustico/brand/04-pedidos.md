# Rústico — Gestión de Pedidos

> Leer `01-identidad.md` y `03-crm.md` antes de este documento.

---

## Flujo completo del pedido

```
CRM: Lead GANADO
      ↓
  PEDIDO CREADO (seña recibida)
      ↓
  EN PRODUCCIÓN (taller)
      ↓
  LISTO PARA DESPACHO (calidad OK)
      ↓
  EN CAMINO (coordinación entrega)
      ↓
  ENTREGADO (confirmación cliente)
      ↓
  POST-VENTA (feedback, próximo pedido)
```

---

## Estados del pedido

| Estado | Color UI | Descripción | Notificación al cliente |
|---|---|---|---|
| `PEDIDO_CREADO` | `#e8dcc8` (beige) | Seña recibida, pendiente de producción | "Recibimos tu pedido ✓" |
| `EN_PRODUCCION` | `#c8a96e` (dorado) | En taller, en proceso de fabricación | "Tu mueble está siendo fabricado 🪵" |
| `CONTROL_CALIDAD` | `#6b7a35` (oliva) | Terminado, revisión final | — (interno) |
| `LISTO_DESPACHO` | `#4d7d35` (verde) | Aprobado, esperando coordinar entrega | "Tu mueble está listo! Coordinemos entrega 📦" |
| `EN_CAMINO` | `#5c3d2e` (marrón) | En tránsito hacia el cliente | "Tu mueble está en camino 🚚" |
| `ENTREGADO` | `#2c1810` (oscuro) | Entrega confirmada | "¿Cómo quedó? Contanos! 🌿" |
| `CANCELADO` | `#a89880` (sand) | Pedido cancelado | "Pedido cancelado — reembolso en proceso" |

---

## Campos del pedido

```json
{
  "id": "pedido_20250314_001",
  "lead_id": "lead_20250314_001",  // referencia al CRM
  "cliente": {
    "nombre": "string",
    "telefono": "string",
    "direccion_entrega": "string",
    "zona": "string (GBA Norte / Sur / Oeste / CABA)"
  },
  "items": [
    {
      "producto": "string",
      "categoria": "string",
      "descripcion": "string",
      "medidas": "string",
      "color_terminacion": "string",
      "cantidad": "number",
      "precio_unitario": "number",
      "personalizado": "boolean",
      "notas_produccion": "string"
    }
  ],
  "totales": {
    "subtotal": "number",
    "envio": "number (0 si GBA incluido)",
    "total": "number",
    "seña": "number",
    "saldo": "number"
  },
  "pago": {
    "metodo": "transferencia | efectivo | mercadopago",
    "seña_recibida": "boolean",
    "seña_monto": "number",
    "saldo_cobrado": "boolean",
    "fecha_seña": "date"
  },
  "produccion": {
    "fecha_inicio": "date",
    "fecha_estimada_entrega": "date",
    "fecha_real_entrega": "date",
    "operario": "string"
  },
  "estado": "enum (ver estados arriba)",
  "canal_origen": "string (del CRM)",
  "tipo_cliente": "b2c | b2b",
  "notas": "text"
}
```

---

## Condiciones comerciales

### B2C (consumidor final)

| Condición | Valor |
|---|---|
| Seña para confirmar | 30–50% del total |
| Saldo | Contra entrega |
| Tiempo de fabricación | 5–10 días hábiles (pieza estándar) |
| Envío | Incluido en GBA |
| Fuera de GBA | Cotizar por separado |
| Personalización | +20% sobre precio base, +5 días hábiles |

### B2B (mayorista)

| Condición | Valor |
|---|---|
| Volumen mínimo | 5 unidades |
| Descuento | 15% (5–9 uds) · 20% (10+) |
| Pago | 50% adelanto · 50% antes de despacho |
| Tiempo de entrega | Según volumen — cotizar |
| Exclusividad de zona | Disponible — ver propuesta comercial |
| Condiciones de consignación | Disponible — ver propuesta comercial |

---

## Mensajes de notificación al cliente (WhatsApp)

### Pedido confirmado
```
Hola [nombre]! 🪵 Confirmamos tu pedido en Rústico.

✅ [Producto] — [medidas]
💰 Total: $[total] · Seña recibida: $[seña]
📅 Entrega estimada: [fecha]

Te avisamos en cada paso del proceso. Cualquier consulta, escribinos acá! ✨
```

### En producción
```
Hola [nombre]! Tu [producto] ya está en el taller 🔨

Nuestros artesanos están trabajando en tu pieza. Te avisamos cuando esté lista.
Tiempo estimado: [X días hábiles]
```

### Listo para despacho
```
Hola [nombre]! 📦 Tu [producto] está listo!

Quedó increíble. ¿Cuándo lo coordinamos?
Entrega: [zona/dirección]
Saldo a pagar: $[saldo]

Avisanos qué día te viene bien 🌿
```

### En camino
```
Hola [nombre]! 🚚 Tu mueble está en camino.

Llegada estimada: [hora aproximada]
Asegurate de estar en [dirección].

¡Ya casi! 🎉
```

### Entregado — post-venta
```
Hola [nombre]! Esperamos que tu [producto] haya llegado perfecto 🌿

¿Cómo quedó en tu espacio? Nos encantaría ver una foto si querés compartirla.

Y si conocés a alguien que busque algo similar, ¡acordate de Rústico! 🪵
```

---

## Dashboard de producción — vista del taller

El panel interno debe mostrar:

```
┌─────────────────────────────────────────────────────┐
│  COLA DE PRODUCCIÓN                                 │
├──────────┬─────────────────┬──────────┬────────────-┤
│ Pedido   │ Producto        │ Estado   │ Entrega     │
├──────────┼─────────────────┼──────────┼─────────────┤
│ #001     │ Aparador Multi  │ 🟡 PROD  │ 20-mar      │
│ #002     │ Mesa Ratona     │ 🟢 LISTO │ 18-mar      │
│ #003     │ Mueble TV       │ ⚪ NUEVO  │ 25-mar      │
└──────────┴─────────────────┴──────────┴─────────────┘

CAPACIDAD ACTUAL: 8/100 muebles del mes
STOCK MATERIA PRIMA: ~100 unidades disponibles
```

---

## Reglas de negocio críticas

1. **Nunca empezar a producir sin seña confirmada.** El pedido queda en `PEDIDO_CREADO` hasta recibir el pago.
2. **Cada pieza es única.** Si hay personalización, fotografiar antes de despachar y compartir con el cliente para aprobación.
3. **Entrega dentro de GBA incluida** — coordinar con el cliente la ventana horaria (mañana/tarde).
4. **Para B2B con volumen**: confirmar stock de materia prima antes de aceptar el pedido.
5. **Post-venta**: pedir foto del mueble instalado → usar para Instagram (con permiso del cliente).
