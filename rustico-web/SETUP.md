# Rústico Web — Setup Guide

## 1. Instalar dependencias

```bash
cd rustico-web
npm install
```

## 2. Configurar Firebase

### 2a. Crear el proyecto Firebase

1. Ir a [console.firebase.google.com](https://console.firebase.google.com) con tu cuenta de Google
2. **Crear nuevo proyecto** → nombre: `rustico-web`
3. Desactivar Google Analytics (no es necesario en fase 1)

### 2b. Activar Firestore

1. En el menú → **Build → Firestore Database**
2. **Crear base de datos** → modo producción
3. Zona: `us-central` (o `southamerica-east1` si está disponible)

Reglas de seguridad iniciales en Firestore:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads: solo escritura pública, lectura solo con Admin SDK
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

### 2c. Obtener configuración del Client SDK

1. Firebase Console → **Configuración del proyecto** (ícono ⚙️)
2. Scroll abajo → **Tus apps** → **Agregar app** → **Web** (</>)
3. Nombre: `rustico-landing`
4. Copiar el objeto `firebaseConfig`

### 2d. Obtener clave del Admin SDK

1. Firebase Console → Configuración → **Cuentas de servicio**
2. **Generar nueva clave privada** → descarga el JSON
3. Guardar el JSON de forma segura (no subirlo al repo)

## 3. Crear el archivo .env.local

```bash
cp .env.local.example .env.local
```

Completar con los valores del paso 2:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rustico-web.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rustico-web
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rustico-web.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123...

FIREBASE_ADMIN_PROJECT_ID=rustico-web
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@rustico-web.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

NEXT_PUBLIC_WHATSAPP_NUMBER=5491100000000
OPERATOR_WHATSAPP_NUMBER=5491100000000
```

> ⚠️ La `FIREBASE_ADMIN_PRIVATE_KEY` va entre comillas dobles y con los `\n` literales.

## 4. Copiar las imágenes del catálogo

```bash
# Copiar las imágenes desde la carpeta del catálogo
cp -r ../catalogo-rustico/imagenes-catalogo/* public/imagenes/
cp ../catalogo-rustico/imagenes/LOGO.jpeg public/imagenes/LOGO.jpeg
```

En Windows (PowerShell):
```powershell
Copy-Item -Path "..\catalogo-rustico\imagenes-catalogo\*" -Destination "public\imagenes\" -Recurse
Copy-Item -Path "..\catalogo-rustico\imagenes\LOGO.jpeg" -Destination "public\imagenes\LOGO.jpeg"
```

## 5. Correr en desarrollo

```bash
npm run dev
```

Abrir: [http://localhost:3000](http://localhost:3000)

## 6. Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en Vercel Dashboard
# Settings → Environment Variables → pegar las mismas del .env.local
```

---

## Estructura del proyecto

```
rustico-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← metadata, fuentes
│   │   ├── page.tsx            ← landing page principal
│   │   ├── globals.css         ← design tokens, componentes base
│   │   └── api/
│   │       └── leads/
│   │           └── route.ts    ← POST /api/leads → Firestore
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ValueProps.tsx
│   │   ├── ProductGrid.tsx     ← filtros + grid
│   │   ├── ProductCard.tsx
│   │   ├── B2BSection.tsx
│   │   ├── ContactForm.tsx     ← formulario → /api/leads
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── firebase.ts         ← client SDK
│   │   ├── firebase-admin.ts   ← admin SDK (server only)
│   │   └── products.ts         ← datos del catálogo
│   └── types/
│       └── index.ts            ← Product, Lead, Order types
├── public/
│   └── imagenes/               ← copiar las fotos del catálogo acá
├── .env.local                  ← variables de entorno (no commitear)
└── SETUP.md                    ← este archivo
```

## Próximos pasos (Fase 2)

- [ ] Dashboard interno `/admin/leads` para ver el CRM
- [ ] Webhook n8n para notificación WhatsApp al operador
- [ ] Firebase Storage para imágenes (en lugar de `/public`)
- [ ] Página de detalle de producto `/producto/[id]`
- [ ] Auth para el dashboard (`/admin`)
