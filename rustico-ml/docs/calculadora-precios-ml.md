# Calculadora de Precios para Mercado Libre — Rústico

> Esta hoja te permite calcular el precio exacto de publicación para cubrir costos,
> comisiones de ML y lograr el margen deseado.

---

## Datos Base del Combo Living

| Concepto | Monto |
|---|---|
| Costo de fabricación | $470.000 |
| Ganancia objetivo mínima | $200.000 |
| **Neto mínimo a recibir** | **$670.000** |

---

## Estructura de Deducciones en ML

### Comisiones por tipo de publicación (valores aproximados 2025)

| Concepto | Clásica | Premium |
|---|---|---|
| Comisión ML (sobre precio venta) | 12% | 16% |
| IVA sobre la comisión (21%) | 2.52% | 3.36% |
| **Total comisión efectiva** | **~14.52%** | **~19.36%** |

### Retenciones impositivas (aproximadas)
| Concepto | % |
|---|---|
| Retención Ganancias | ~2% |
| Retención IIBB (Buenos Aires) | ~3% |
| **Total retenciones** | **~5%** |

### Cuotas sin interés (costo absorbido por vendedor)
| Cuotas | Costo aproximado |
|---|---|
| 1 cuota (contado) | 0% |
| 3 cuotas sin interés | ~2.9% |
| 6 cuotas sin interés | ~6.8% |
| 12 cuotas sin interés | ~14.5% |

---

## Fórmula de Precio

```
Precio de publicación = Neto deseado ÷ (1 - % comisión - % retenciones - % cuotas)
```

### Ejemplo: Combo Living, Clásica, 3 cuotas

```
Deducciones totales = 14.52% + 5% + 2.9% = 22.42%
Factor = 1 - 0.2242 = 0.7758

Precio = $670.000 ÷ 0.7758 = ~$863.600
```

### Ejemplo: Combo Living, Clásica, sin cuotas

```
Deducciones = 14.52% + 5% = 19.52%
Factor = 1 - 0.1952 = 0.8048

Precio = $670.000 ÷ 0.8048 = ~$832.500
```

---

## Tabla de Escenarios — Combo Living ($670.000 neto)

| Publicación | Cuotas | Precio sugerido | Cuota para cliente | Neto estimado |
|---|---|---|---|---|
| Clásica | Sin cuotas | $833.000 | — | ~$671.000 |
| Clásica | 3 cuotas s/i | $864.000 | ~$288.000 x 3 | ~$671.000 |
| Clásica | 6 cuotas s/i | $905.000 | ~$151.000 x 6 | ~$671.000 |
| Premium | Sin cuotas | $883.000 | — | ~$671.000 |
| Premium | 3 cuotas s/i | $918.000 | ~$306.000 x 3 | ~$671.000 |
| **Premium** | **6 cuotas s/i** | **$950.000** | **~$158.000 x 6** | **~$671.000** |

> **Precio recomendado en CLAUDE.md:** $1.150.000 (3 cuotas ~$383.000 x 3)
> Ese precio incluye margen adicional. Usalo como precio de lanzamiento.

---

## Tabla de Sensibilidad — ¿Qué pasa si sube el costo?

| Costo fabricación | Precio Clásica 3 cuotas | Precio Premium 6 cuotas |
|---|---|---|
| $400.000 | $768.000 | $838.000 |
| $470.000 | $864.000 | $950.000 |
| $550.000 | $942.000 | $1.030.000 |
| $650.000 | $1.051.000 | $1.148.000 |
| $750.000 | $1.160.000 | $1.268.000 |

*(Todos con $200.000 de ganancia objetivo)*

---

## Verificación Final Antes de Publicar

Antes de subir el precio, confirmá:
- [ ] ¿El precio cubre fabricación + ganancia?
- [ ] ¿Las cuotas quedan competitivas vs. la competencia?
- [ ] ¿El precio refleja el valor diferencial (artesanal, rústico, único)?
- [ ] ¿Actualizaste las comisiones de ML? (cambian periódicamente)

> Verificar comisiones actualizadas en: ML → Tu cuenta → Facturación → Comisiones

---

*Última actualización: Marzo 2026 — Verificar alícuotas actuales en ML antes de publicar*
