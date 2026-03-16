# Cómo agregar las imágenes al catálogo

## Paso 1 — Descargá las fotos del Drive

1. Abrí la carpeta de Google Drive
2. Seleccioná todas las fotos → botón derecho → **Descargar**
3. Extraé el ZIP que se descarga

## Paso 2 — Organizá las imágenes

Renombrá las fotos así y copialas a la carpeta `imagenes/`:

| Archivo                    | Uso en el catálogo              |
|----------------------------|---------------------------------|
| `mesa-arrime-01.jpg`       | Foto principal del hero (frente)|
| `mesa-arrime-02.jpg`       | Ángulo lateral                  |
| `mesa-arrime-03.jpg`       | Detalle de madera/terminación   |
| `pieza-02.jpg`             | 2da pieza en la galería         |
| `pieza-03.jpg`             | 3ra pieza en la galería         |
| `pieza-04.jpg`             | 4ta pieza en la galería         |

## Paso 3 — Activar las imágenes en el HTML

Abrí `catalogo.html` con un editor de texto (Notepad, VS Code, etc.)

Buscá cada bloque de comentario `<!-- <img ...> -->` y eliminá los comentarios.

**Ejemplo — antes:**
```html
<!--
  *** REEMPLAZAR: coloca la mejor foto de la mesa en imagenes/mesa-arrime-01.jpg
  <img src="imagenes/mesa-arrime-01.jpg" alt="Mesa de arrime Atelier" />
-->
<div class="img-placeholder">...</div>
```

**Ejemplo — después:**
```html
<img src="imagenes/mesa-arrime-01.jpg" alt="Mesa de arrime Atelier" />
```

(También eliminá el `<div class="img-placeholder">` y su contenido)

## Paso 4 — Optimizar fotos para web (opcional pero recomendado)

Para que el catálogo cargue rápido al compartirlo:

- Usá [squoosh.app](https://squoosh.app) (gratis, en el navegador)
- Formato: **WebP** o **JPEG**
- Calidad: **80%**
- Ancho máximo: **1200px**

## Paso 5 — Compartir el catálogo

**Opción A — Compartir el archivo HTML:**
- Comprimí toda la carpeta `catalogo-rustico/` en un ZIP
- Mandalo por WhatsApp o email
- El destinatario abre el `.html` en su navegador

**Opción B — Subir online (más profesional):**
- Subir a [Netlify Drop](https://app.netlify.com/drop) (gratis, arrastrar la carpeta)
- Te da un link público tipo `tu-catalogo.netlify.app`
- Ese link lo compartís por WhatsApp e Instagram

## Paso 6 — Actualizar el número de WhatsApp en el catálogo

En `catalogo.html` buscá esta línea:
```
https://wa.me/549XXXXXXXXXX
```
Reemplazá `XXXXXXXXXX` con tu número (sin el +, sin guiones).
Ejemplo: `https://wa.me/5491123456789`
