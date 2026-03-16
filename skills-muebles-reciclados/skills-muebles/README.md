# 🪵 Skills para Fábrica de Muebles Reciclados

Conjunto de 7 Skills para Claude Code diseñados para operar el marketing, las ventas B2B
y la estrategia de una fábrica de muebles reciclados estilo rústico/campo en GBA.

## Skills incluidos

| Skill | Comando | Para qué sirve |
|-------|---------|----------------|
| Community Manager | `/community-manager` | Calendarios editoriales, copys, hashtags, ideas de Reels, respuestas a DMs |
| Prospector B2B | `/prospector-b2b` | Mensajes personalizados para contactar mueblerías y locales por DM, WhatsApp, email |
| Propuesta Comercial | `/propuesta-comercial` | Documentos formales de propuesta B2B con precios, condiciones y opciones |
| Analizador de Métricas | `/analizador-metricas` | Análisis de métricas de Instagram/Facebook con recomendaciones accionables |
| CRM de Ventas | `/crm-ventas` | Gestión del pipeline B2B, seguimiento de prospectos, priorización de leads |
| Catálogo Digital | `/catalogo-digital` | Fichas de producto, listings para Marketplace, catálogo mayorista PDF |
| Estratega Semanal | `/estratega-semanal` | Planificación semanal, revisión de metas, decisiones estratégicas del negocio |

## Instalación en Claude Code

### Opción 1: Skills de proyecto (compartidos con el equipo)
```bash
# Desde la raíz de tu proyecto
cp -r skills-muebles/* .claude/skills/
```

### Opción 2: Skills de usuario (personales, disponibles en todos los proyectos)
```bash
# Copiar a tu directorio personal de skills
cp -r skills-muebles/* ~/.claude/skills/
```

## Cómo usar

### Invocación directa (con /)
```
/community-manager Generame el calendario editorial de esta semana
/prospector-b2b Necesito un DM para una mueblería rústica en Tigre llamada "El Granero"
/propuesta-comercial Armá la propuesta para un bar en San Isidro que quiere 15 mesas
/analizador-metricas [pegar métricas de Meta Business Suite]
/crm-ventas Revisá mi pipeline, tengo 5 contactados y 2 interesados
/catalogo-digital Haceme la ficha de una mesa ratona de 120x60cm
/estratega-semanal Planifiquemos esta semana, estamos en el día 20 del plan
```

### Invocación automática
Claude también puede usar los skills automáticamente cuando detecte que tu consulta
encaja con lo que hace alguno de ellos. Solo preguntá naturalmente:

- "¿Qué publico mañana en Instagram?" → usa community-manager
- "Tengo que contactar 10 locales nuevos" → usa prospector-b2b
- "¿Cómo venimos con las metas?" → usa estratega-semanal

## Personalización

### Actualizar datos del negocio
Cada skill tiene un archivo `references/contexto-negocio.md` con los datos base.
Cuando cambien los datos (precios, capacidad, clientes), actualizá ese archivo
y todos los skills usarán la info nueva.

### Agregar productos al catálogo
Podés crear archivos adicionales en `catalogo-digital/references/` con fichas
de productos específicos que el skill pueda consultar.

## Estructura de archivos

```
skills-muebles/
├── README.md
├── community-manager/
│   ├── SKILL.md
│   └── references/
│       └── contexto-negocio.md
├── prospector-b2b/
│   ├── SKILL.md
│   └── references/
│       └── contexto-negocio.md
├── propuesta-comercial/
│   ├── SKILL.md
│   └── references/
│       └── contexto-negocio.md
├── analizador-metricas/
│   ├── SKILL.md
│   └── references/
│       └── contexto-negocio.md
├── crm-ventas/
│   ├── SKILL.md
│   └── references/
│       └── contexto-negocio.md
├── catalogo-digital/
│   ├── SKILL.md
│   └── references/
│       └── contexto-negocio.md
└── estratega-semanal/
    ├── SKILL.md
    └── references/
        └── contexto-negocio.md
```

## Rutina diaria sugerida con los skills

| Horario | Actividad | Skill a usar |
|---------|-----------|-------------|
| 8:00 | Generar copys del día | `/community-manager` |
| 12:00 | Publicar + responder DMs | `/community-manager` |
| 18:00 | Prospección B2B (contactar locales) | `/prospector-b2b` |
| 18:20 | Actualizar CRM | `/crm-ventas` |
| Viernes | Análisis semanal de métricas | `/analizador-metricas` |
| Domingo | Planificación de la semana | `/estratega-semanal` |
| Según necesidad | Catálogo, propuestas | `/catalogo-digital` `/propuesta-comercial` |
