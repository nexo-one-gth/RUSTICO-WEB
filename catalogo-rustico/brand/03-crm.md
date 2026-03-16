# Rústico — CRM de Ventas

> Leer `01-identidad.md` antes de este documento.
> Skill asociado: `/crm-ventas`

---

## Filosofía del CRM

El CRM de Rústico no es un sistema de presión — es un sistema de **seguimiento con contexto**.
Cada lead tiene historia, intención y canal de origen. El objetivo es cerrar con calidez, no con spam.

---

## Tipos de lead

### B2C (consumidor final)
- Llega por Instagram DM, WhatsApp, o formulario de landing page
- Busca una pieza específica o quiere ver el catálogo completo
- Ticket: $100.000–$160.000+ ARS
- Ciclo de decisión: 1–5 días

### B2B (negocio / revendedor)
- Mueblería, local de decoración, bar/restó, decorador/arquitecto
- Llega por prospección activa (outbound) o referido
- Ticket: 10+ unidades, descuento 15–20%
- Ciclo de decisión: 7–30 días
- Skill: `/prospector-b2b` para primer contacto · `/propuesta-comercial` para cierre

---

## Campos del lead

### Datos básicos

| Campo | Tipo | Requerido | Ejemplo |
|---|---|---|---|
| `id` | UUID | ✓ | `lead_20250314_001` |
| `nombre` | string | ✓ | "María García" |
| `tipo` | enum | ✓ | `b2c` / `b2b` |
| `canal_origen` | enum | ✓ | `instagram_dm` / `whatsapp` / `facebook` / `landing_form` / `referido` / `outbound` |
| `fecha_ingreso` | date | ✓ | `2025-03-14` |
| `telefono` | string | ✓ para WA | "+54911XXXXXXXX" |
| `instagram_handle` | string | si aplica | "@maria.garcia" |
| `email` | string | ✓ para B2B | "maria@ejemplo.com" |

### Datos B2B adicionales

| Campo | Tipo | Ejemplo |
|---|---|---|
| `nombre_negocio` | string | "El Granero Decoración" |
| `tipo_negocio` | enum | `muebleria` / `bar_resto` / `decorador` / `arquitecto` / `developer` / `otro` |
| `zona` | string | "San Isidro, GBA Norte" |
| `instagram_negocio` | string | "@elgranero.deco" |
| `volumen_potencial` | number | 10 (unidades/mes estimadas) |

### Datos de interés

| Campo | Tipo | Ejemplo |
|---|---|---|
| `producto_interes` | string | "Aparador multicolor" |
| `categoria_interes` | enum | Ver categorías en `01-identidad.md` |
| `presupuesto_estimado` | number | 160000 |
| `medidas_especiales` | boolean | true/false |
| `notas` | text | "Quiere el aparador en verde agua, consultar disponibilidad" |

---

## Pipeline — Etapas del lead

```
NUEVO → CONTACTADO → INTERESADO → PROPUESTA → NEGOCIACIÓN → GANADO / PERDIDO
```

### Descripción de etapas

| Etapa | Descripción | Acción siguiente | Tiempo límite |
|---|---|---|---|
| **NUEVO** | Lead recién ingresado, sin primer contacto | Hacer primer contacto | 2 horas hábiles |
| **CONTACTADO** | Se le envió mensaje inicial, sin respuesta aún | Seguimiento si no responde en 48h | 48 horas |
| **INTERESADO** | Respondió, mostró interés, pidió info | Enviar fotos / catálogo / precio | 24 horas |
| **PROPUESTA** | Se le envió precio y condiciones formales (B2B) | Esperar respuesta, seguimiento en 3 días | 3–7 días |
| **NEGOCIACIÓN** | Está evaluando, puede haber preguntas de precio/plazo | Responder objeciones, mantener relación | — |
| **GANADO** | Confirmó pedido o seña recibida | Pasar a sistema de pedidos | — |
| **PERDIDO** | No respondió o declinó | Registrar motivo, archivar | — |

### Colores de etapa en UI

| Etapa | Color de fondo | Texto |
|---|---|---|
| NUEVO | `#faf7f2` | `#3a2a1e` |
| CONTACTADO | `#e8dcc8` | `#5c3d2e` |
| INTERESADO | `#c8a96e` (dorado) | `#2c1810` |
| PROPUESTA | `#5c3d2e` | `#f5f0e8` |
| NEGOCIACIÓN | `#6b7a35` (oliva) | `#faf7f2` |
| GANADO | `#4d7d35` (verde) | `#faf7f2` |
| PERDIDO | `#a89880` (sand) | `#faf7f2` |

---

## Flujo de datos: Landing Page → CRM

```
[Landing Page — Formulario]
        ↓
  POST /api/leads
        ↓
  Validación de campos requeridos
        ↓
  Crear lead con etapa = "NUEVO"
        ↓
  Trigger: Notificación WhatsApp al operador
        ↓
  Auto-respuesta al lead (email o WA según canal)
```

### Campos del formulario de landing

```json
{
  "nombre": "string, required",
  "telefono": "string, required",
  "canal_contacto": "whatsapp | email, required",
  "tipo": "b2c | b2b, required",
  "producto_interes": "string, optional",
  "mensaje": "text, optional",
  "utm_source": "string, auto (Instagram | Facebook | directo)",
  "utm_campaign": "string, auto"
}
```

---

## Seguimiento — reglas de contacto

| Situación | Acción | Canal | Tiempo |
|---|---|---|---|
| Lead nuevo sin contacto | Primer mensaje | WA / DM | ≤ 2h hábiles |
| No respondió en 48h | Seguimiento con foto del producto | WA / DM | 48h |
| No respondió al seguimiento | Último intento con catálogo | WA / DM | 72h más |
| Tres intentos sin respuesta | Mover a PERDIDO | — | — |
| Respondió pero dudoso | Check-in amigable | WA | 5–7 días |
| GANADO esperando entrega | Confirmar fecha | WA | 24h antes de entrega |

---

## Métricas clave del CRM

| Métrica | Fórmula | Meta |
|---|---|---|
| Tasa de respuesta | Leads que responden / Total contactados | >60% |
| Tasa de conversión | Ganados / Leads ingresados | >25% B2C · >15% B2B |
| Tiempo de cierre promedio | Días entre NUEVO y GANADO | <3 días B2C · <14 días B2B |
| Pipeline B2B activo | Leads en etapas INTERESADO+PROPUESTA+NEG | ≥5 en todo momento |
| Ticket promedio B2B | $ total ganados B2B / cantidad | Objetivo: 10+ unidades/cliente |

---

## Integración con skills de IA

| Situación en CRM | Skill a usar |
|---|---|
| Necesito mensaje de primer contacto B2B | `/prospector-b2b` |
| Necesito armar propuesta formal para B2B | `/propuesta-comercial` |
| Quiero revisar el estado del pipeline | `/crm-ventas` |
| Quiero planificar acciones de la semana | `/estratega-semanal` |
