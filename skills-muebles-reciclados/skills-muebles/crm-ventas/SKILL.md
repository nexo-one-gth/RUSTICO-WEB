---
name: crm-ventas
description: >
  Gestiona el CRM de ventas B2B de la fábrica de muebles reciclados. Ayuda a organizar
  prospectos en Google Sheets, hacer seguimiento de contactos, priorizar leads, registrar
  interacciones y planificar próximos pasos comerciales. Usá este skill cuando el usuario
  mencione: CRM, seguimiento de clientes, pipeline, prospectos, leads, planilla de ventas,
  estado de contactos, a quién contactar, prioridades de venta, funnel, embudo de ventas,
  Google Sheets de clientes, o cualquier tarea de organización y seguimiento comercial B2B.
---

# CRM de Ventas B2B — Fábrica de Muebles Reciclados

Gestionás el pipeline de ventas B2B usando Google Sheets como CRM simple
y eficiente para una operación de una persona.

## Contexto

Leé `references/contexto-negocio.md` para datos del negocio.

## Estructura del CRM (Google Sheets)

### Hoja 1: Prospectos
Columnas recomendadas:

| Columna | Descripción |
|---------|-------------|
| ID | Número correlativo |
| Nombre del local | Nombre comercial |
| Contacto | Nombre de la persona de contacto |
| Instagram | @ del local |
| WhatsApp/Tel | Número de contacto |
| Email | Si lo tiene |
| Zona | Barrio/localidad en GBA |
| Estilo | Rústico, industrial, campo, moderno, etc. |
| Tamaño | Chico / Mediano / Grande |
| Estado | 🔵 Nuevo → 🟡 Contactado → 🟠 Interesado → 🟢 Cliente → 🔴 Descartado |
| Modelo preferido | Consignación / Mayorista / Exclusividad / A pedido |
| Fecha primer contacto | DD/MM/AAAA |
| Fecha último contacto | DD/MM/AAAA |
| Próximo paso | Acción concreta siguiente |
| Fecha próximo paso | DD/MM/AAAA |
| Notas | Observaciones libres |

### Hoja 2: Historial de interacciones
| Columna | Descripción |
|---------|-------------|
| Fecha | DD/MM/AAAA |
| Local | Nombre (referencia a Hoja 1) |
| Canal | DM / WhatsApp / Email / Presencial / Teléfono |
| Tipo | Primer contacto / Seguimiento / Envío catálogo / Reunión / Cierre |
| Detalle | Qué se habló/envió |
| Resultado | Respuesta positiva / Sin respuesta / Negativa / Cerrado |

### Hoja 3: Dashboard
Métricas clave (fórmulas automáticas):
- Total prospectos
- Por estado (nuevo/contactado/interesado/cliente/descartado)
- Tasa de conversión contacto → interesado
- Tasa de conversión interesado → cliente
- Clientes activos
- Muebles vendidos B2B este mes

## Flujos de trabajo

### Agregar prospectos nuevos
Cuando el usuario dice "encontré estos locales" o pide armar la lista:
1. Solicitar: nombre, zona, Instagram, estilo
2. Formatear para copiar a Sheets
3. Asignar estado "🔵 Nuevo"
4. Sugerir próximo paso (investigar perfil → contactar)

### Revisión semanal del pipeline
Cuando pidan revisar el estado:
1. Pedir que peguen o describan el estado actual del CRM
2. Identificar:
   - Prospectos estancados (sin contacto en >7 días)
   - Interesados sin seguimiento
   - Oportunidades de avanzar al siguiente paso
3. Generar lista de acciones para la semana:
   - "Enviar seguimiento a X (hace 5 días sin respuesta)"
   - "Mandar catálogo a Y (mostró interés)"
   - "Agendar visita a Z (pidió presupuesto)"

### Priorización de leads
Criterios para priorizar (de mayor a menor):
1. **Caliente**: Pidió catálogo, preguntó precios, quiere visita → contactar HOY
2. **Tibio**: Respondió positivo pero no avanzó → seguimiento esta semana
3. **Frío**: No respondió al primer contacto → segundo intento en 5 días
4. **Descartado**: No responde después de 3 intentos o dijo no → mover a descartado

### Reporte mensual
Generar resumen con:
- Nuevos prospectos agregados
- Conversiones logradas
- Pipeline actual por estado
- Proyección de ventas B2B próximo mes
- Ajustes sugeridos a la estrategia

## Reglas

- Mantener todo simple — es un CRM para UNA persona con 2 horas/día
- Priorizar acción sobre registro — mejor contactar que documentar
- Máximo 3 prioridades diarias de ventas
- Español argentino, tono práctico
- Si el usuario no tiene Sheets armado, generar la plantilla lista para copiar
