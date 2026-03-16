# Rústico → SaaS: Visión y Arquitectura

> Este documento describe cómo el sistema construido para Rústico evoluciona en un producto SaaS replicable para cualquier taller/fábrica artesanal.

---

## Visión

**Rústico** es el cliente 0 (piloto).
El sistema que se construye acá — landing + CRM + pedidos + skills de IA + redes — es la base de un **SaaS vertical para talleres artesanales y fábricas pequeñas** que operan con cero equipo y cero presupuesto publicitario.

**Nombre de trabajo del SaaS:** `Nexo`
(puede cambiar — es el nombre de la carpeta padre del proyecto)

---

## Problema que resuelve

Los talleres artesanales (muebles, cerámica, textil, carpintería, etc.) tienen:
- Producto excelente
- Presencia digital caótica o nula
- Sin sistema de seguimiento de leads
- Sin catálogo digital actualizado
- Sin flujo claro de pedidos
- Sin tiempo ni plata para un equipo de marketing

**Nexo les da el sistema completo, operado en gran parte por IA.**

---

## Módulos del SaaS

### Módulo 1 — Catálogo + Landing Page
- Landing page generada automáticamente desde catálogo de productos
- Imágenes subidas por el usuario
- Templates de diseño por vertical (muebles, cerámica, textil, etc.)
- SEO automático por producto
- Link en bio para Instagram
- **Estado en Rústico:** En diseño (ver `05-landing-page.md`)

### Módulo 2 — CRM Simplificado
- Pipeline visual (kanban) con 6 etapas
- Leads desde landing form + Instagram DM + WhatsApp (manual o webhook)
- Notificaciones WhatsApp al operador en tiempo real
- Historial de conversación por lead
- Tags B2C / B2B
- **Estado en Rústico:** Documentado (ver `03-crm.md`)

### Módulo 3 — Gestión de Pedidos
- Flujo producción → despacho → entrega
- Notificaciones automáticas al cliente en cada etapa
- Dashboard del taller con cola de producción
- Control de stock de materia prima
- **Estado en Rústico:** Documentado (ver `04-pedidos.md`)

### Módulo 4 — Skills de IA (co-piloto)
- 7 skills ya construidos: community manager, prospector B2B, propuesta comercial, analizador de métricas, CRM de ventas, catálogo digital, estratega semanal
- Embebidos en la interfaz del SaaS como "Asistente"
- El usuario activa el skill desde el panel
- **Estado en Rústico:** Operativos (ver `../skills-muebles-reciclados/`)

### Módulo 5 — Redes Sociales
- Generador de copys para posts, stories, reels
- Calendario editorial visual
- Descarga de imagen + copy listos para publicar
- Respuestas sugeridas para DMs
- **Estado en Rústico:** Guidelines documentadas (ver `02-redes.md`)

### Módulo 6 — Analytics
- Métricas de la landing (visitas, conversión a lead, fuente de tráfico)
- Métricas del CRM (tasa de cierre, tiempo de ciclo, canal más rentable)
- Reporte semanal automático generado por IA
- **Estado en Rústico:** Skill `/analizador-metricas` construido

---

## Arquitectura técnica

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                        │
│              Next.js 14 App Router · Tailwind CSS               │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────────────┐
│                      API LAYER (Next.js API Routes)             │
│  /api/leads      /api/orders      /api/products     /api/ai     │
└──────┬───────────────┬────────────────┬────────────────┬────────┘
       │               │                │                │
┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼───────┐
│  CRM DB     │ │  Orders DB  │ │  Catalog DB │ │ Claude API   │
│  (Postgres) │ │  (Postgres) │ │  (Postgres) │ │ (Anthropic)  │
└─────────────┘ └─────────────┘ └─────────────┘ └──────┬───────┘
                                                        │ Skills
                                               ┌────────▼───────┐
                                               │ Skills Engine  │
                                               │ community-mgr  │
                                               │ crm-ventas     │
                                               │ prospector-b2b │
                                               │ + 4 más        │
                                               └────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    INTEGRACIONES EXTERNAS                       │
│  WhatsApp Business API  ·  Instagram Graph API  ·  n8n/Make    │
│  Vercel (deploy)  ·  Cloudinary (imágenes)  ·  Resend (email)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Multi-tenancy (para SaaS)

Cada cliente del SaaS (taller) tiene:

```
tenant: {
  id: "rustico_001",
  nombre: "Rústico Muebles",
  vertical: "muebles",
  plan: "starter | growth | pro",
  config: {
    colores: { ... },       // brand kit personalizado
    tipografia: { ... },
    logo_url: "...",
    whatsapp: "+54911...",
    instagram: "@rustico.muebles",
    zona: "GBA"
  },
  productos: [ ... ],
  leads: [ ... ],
  pedidos: [ ... ]
}
```

**Aislamiento:** Row-Level Security en Postgres por `tenant_id`.

---

## Planes del SaaS (propuesta inicial)

| Plan | Precio/mes | Límites | Módulos |
|---|---|---|---|
| **Starter** | $15 USD | 50 leads/mes · 20 productos · 1 usuario | Landing + CRM básico |
| **Growth** | $39 USD | 300 leads/mes · 100 productos · 3 usuarios | + Pedidos + Skills IA (5 consultas/día) |
| **Pro** | $79 USD | Ilimitado · usuarios ilimitados | Todo + Skills IA ilimitados + Analytics |

---

## Roadmap

### Fase 1 — MVP (Rústico como piloto) [Ahora]
- [x] Brand kit completo (`brand/`)
- [x] Skills de IA (7 skills)
- [x] Templates Canva
- [ ] Landing page + catálogo (Next.js)
- [ ] API `/api/leads` → CRM en Notion o Google Sheets (MVP rápido)
- [ ] Notificación WhatsApp al operador

### Fase 2 — Producto SaaS [+30 días]
- [ ] CRM propio (Postgres + Kanban UI)
- [ ] Módulo de pedidos con dashboard de taller
- [ ] Auth multi-tenant (NextAuth)
- [ ] Onboarding wizard (subir logo, colores, productos)

### Fase 3 — Escala [+60 días]
- [ ] Skills de IA embebidos en el panel
- [ ] Instagram DM → lead automático (webhook)
- [ ] Generador de posts con imagen (Canva API o DALL-E)
- [ ] Segundo cliente (vertical diferente)

### Fase 4 — Producto completo [+90 días]
- [ ] Analytics completo
- [ ] App móvil (PWA o React Native)
- [ ] Marketplace de templates de branding
- [ ] 10 clientes pagos

---

## Decisiones de arquitectura clave

| Decisión | Elección | Razón |
|---|---|---|
| Frontend | Next.js 14 | SSG para catálogos, API routes integradas, Vercel nativo |
| DB | Postgres (Supabase o Railway) | RLS nativo para multi-tenant |
| ORM | Prisma | Type-safe, migraciones fáciles |
| Auth | NextAuth v5 | Simple, multi-provider |
| IA | Claude API (Anthropic) | Ya hay 7 skills construidos en este sistema |
| Imágenes | Cloudinary | Transformaciones automáticas (WebP, resize, crop) |
| Notificaciones | n8n self-hosted o Make | WA Business API sin código |
| Deploy | Vercel | Free tier en fase piloto |
| Monitoreo | Sentry + Vercel Analytics | Sin costo en fase inicial |

---

## Datos de negocio del SaaS (proyección)

| Métrica | Mes 3 | Mes 6 | Mes 12 |
|---|---|---|---|
| Clientes pagos | 5 | 20 | 80 |
| MRR | $200 USD | $800 USD | $3.200 USD |
| Churn objetivo | < 5%/mes | < 5%/mes | < 3%/mes |
| CAC | $0 (outbound manual) | $20 | $15 |
| LTV estimado | $156 (avg 4 meses Growth) | — | — |

---

## Próximo paso inmediato

Construir la landing page de Rústico como primer MVP concreto.
Ver spec completo en `05-landing-page.md`.

Stack mínimo para empezar:
1. `npx create-next-app@latest rustico-landing`
2. Instalar Tailwind + Bebas Neue + Plus Jakarta Sans
3. Implementar secciones en orden: Hero → Catálogo → Formulario
4. API route `/api/leads` → Google Sheets (sin DB propia en fase 1)
5. Notificación WA con n8n o Make (free tier)
6. Deploy en Vercel
