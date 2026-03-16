"""
Procesador de imagenes para catálogo Atelier Muebles Rústicos
- Recorta barras negras de screenshots
- Mejora brillo, contraste, color y calidez
- Renombra con nombres descriptivos
- Optimiza para web (max 1200px)
"""

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import os

INPUT_DIR  = "imagenes"
OUTPUT_DIR = "imagenes-catalogo"
MAX_WIDTH  = 1200
MAX_HEIGHT = 1200
QUALITY    = 85

# ── Clasificación de productos por imagen ──────────────────────────────────────
# Cada entry: (nombre_archivo_salida, tipo_mejora)
# tipos: "normal" | "screenshot" | "oscura" | "exterior" | "skip"

IMAGENES = {
    # ── PRODUCTO ESTRELLA ────────────────────────────────────────────────────
    "IMG-20241103-WA0071.jpg": ("mesa-arrime-atelier-blanca-living.jpg",    "normal"),   # MESA DE ARRIME - consola blanca angosta en living decorado

    # ── MESAS RATONAS (en ambientes reales) ─────────────────────────────────
    "IMG-20241103-WA0037.jpg": ("mesa-ratona-chimenea.jpg",                 "normal"),   # ratona en living con chimenea de piedra
    "IMG-20241103-WA0038.jpg": ("mesa-ratona-sofa.jpg",                     "normal"),   # ratona con sofa en seccional
    "IMG-20241103-WA0039.jpg": ("mesa-ratona-flores.jpg",                   "normal"),   # ratona con sofa azul y flores
    "IMG-20241103-WA0055.jpg": ("mesa-ratona-living-espejo.jpg",            "normal"),   # ratona en living con espejo y sofa
    "IMG-20241103-WA0052.jpg": ("mesa-ratona-blanca-taller.jpg",            "oscura"),   # ratona blanca en taller

    # ── MUEBLES PARA TV (en ambientes reales) ───────────────────────────────
    "IMG-20241103-WA0029.jpg": ("mueble-tv-rustico-living.jpg",             "normal"),   # TV sobre mueble rústico natural con planta
    "IMG-20241103-WA0060.jpg": ("mueble-tv-cabana-troncos.jpg",             "normal"),   # TV en cabaña de troncos
    "IMG-20241103-WA0066.jpg": ("mueble-tv-bicolor-blanco-living.jpg",      "normal"),   # buffet blanco/madera con TV en living
    "IMG-20241103-WA0067.jpg": ("mueble-tv-rustico-cajones-living.jpg",     "normal"),   # mueble TV rústico blanco cajones en living
    "IMG-20241103-WA0068.jpg": ("mueble-tv-verde-conjunto.jpg",             "normal"),   # conjunto TV verde + repisa pared
    "IMG-20241103-WA0047.jpg": ("mueble-tv-blanco-provenzal-living.jpg",    "normal"),   # buffet blanco provenzal con TV y decoracion
    "IMG-20241103-WA0049.jpg": ("mueble-tv-multicolor-living.jpg",          "normal"),   # mueble TV multicolor con TV prendida
    "IMG-20241103-WA0048.jpg": ("conjunto-tv-vitrinas-living.jpg",          "normal"),   # conjunto mueble TV + 2 vitrinas en living

    # ── APARADORES Y BUFFETS (ambientes reales) ──────────────────────────────
    "IMG-20241103-WA0042.jpg": ("aparador-natural-living-flores.jpg",       "normal"),   # aparador natural con flores y cuadros
    "IMG-20241103-WA0030.jpg": ("buffet-crema-provenzal-living.jpg",        "normal"),   # buffet crema con fotos y decoracion
    "IMG-20241103-WA0045.jpg": ("aparador-multicolor-con-decoracion.jpg",   "normal"),   # aparador multicolor con globo y Buda

    # ── APARADORES Y BUFFETS (taller/exterior) ───────────────────────────────
    "IMG-20241103-WA0024.jpg": ("aparador-multicolor-cajones.jpg",          "watermark"),# aparador colorido cajones verde naranja amarillo
    "IMG-20241103-WA0027.jpg": ("aparador-multicolor-salon.jpg",            "oscura"),   # aparador multicolor en salon
    "IMG-20241103-WA0028.jpg": ("aparador-multicolor-grande.jpg",           "oscura"),   # aparador multicolor puertas paneles
    "IMG-20241103-WA0034.jpg": ("aparador-multicolor-cajones-dobles.jpg",   "oscura"),   # aparador multicolor cajones arriba y abajo
    "IMG-20241103-WA0041.jpg": ("buffet-rojo-multicolor.jpg",               "oscura"),   # buffet rojo con cajones multicolor
    "IMG-20241103-WA0046.jpg": ("aparador-arcoiris-completo.jpg",           "exterior"), # aparador arcoiris frente completo
    "IMG-20241103-WA0058.jpg": ("aparador-decape-multicajones.jpg",         "oscura"),   # aparador rústico decapé blanco muchos cajones
    "IMG-20241103-WA0062.jpg": ("aparador-natural-puertas-rejilla.jpg",     "oscura"),   # aparador natural puertas rejilla y persiana
    "IMG-20241103-WA0069.jpg": ("aparador-natural-blanco-cajones.jpg",      "oscura"),   # aparador natural/blanco 5 cajones y 2 puertas
    "IMG-20241103-WA0025.jpg": ("mueble-tv-multicolor-tiras.jpg",           "oscura"),   # mueble TV tiras multicolor
    "IMG-20241103-WA0035.jpg": ("mueble-blanco-provenzal-taller.jpg",       "oscura"),   # mueble blanco provenzal en taller
    "IMG-20241103-WA0036.jpg": ("aparador-turquesa-rustico.jpg",            "oscura"),   # aparador turquesa/verde rústico
    "IMG-20241103-WA0040.jpg": ("aparador-verde-cajones-taller.jpg",        "screenshot"),# aparador verde con cajones - screenshot

    # ── CONSOLAS / MESAS DE ARRIME (exterior/taller) ────────────────────────
    "IMG-20241103-WA0032.jpg": ("consola-rustica-ventanas-lateral.jpg",     "exterior"), # consola rústica con ventanas en lateral
    "IMG-20241103-WA0033.jpg": ("consola-naranja-persiana.jpg",             "exterior"), # consola naranja con persiana en lateral
    "IMG-20241103-WA0043.jpg": ("consola-rojiza-patio.jpg",                 "exterior"), # consola rojiza en patio con cajones
    "IMG-20241103-WA0044.jpg": ("mueble-tv-natural-madera-clara.jpg",       "normal"),   # mueble TV natural madera clara en taller
    "IMG-20241103-WA0051.jpg": ("mueble-tv-arcoiris-angular.jpg",           "exterior"), # mueble TV arcoiris stripes angular exterior
    "IMG-20241103-WA0070.jpg": ("aparador-arcoiris-lateral.jpg",            "exterior"), # aparador arcoiris vista lateral

    # ── MUEBLES DE BANO (en ambientes reales) ────────────────────────────────
    "IMG-20241103-WA0059.jpg": ("vanitory-rustico-bacha-blanca.jpg",        "normal"),   # vanitory con bacha blanca ovalada
    "IMG-20241103-WA0053.jpg": ("vanitory-rustico-bacha-bol.jpg",           "normal"),   # vanitory con bacha bol ceramica
    "IMG-20241103-WA0061.jpg": ("bathroom-set-rustico-espejo.jpg",          "normal"),   # set de bano completo con espejo

    # ── VITRINEROS Y ALACENAS (en ambientes reales) ──────────────────────────
    "IMG-20241103-WA0063.jpg": ("vitrinero-rustico-en-uso.jpg",             "normal"),   # vitrinero rústico en living con vajilla
    "IMG-20241103-WA0064.jpg": ("alacena-natural-en-living.jpg",            "normal"),   # alacena natural vidrio en living

    # ── ISLAS DE COCINA ──────────────────────────────────────────────────────
    "IMG-20241103-WA0056.jpg": ("isla-cocina-azul-provenzal.jpg",           "exterior"), # isla de cocina azul provenzal con cajones
    "IMG-20241103-WA0073.jpg": ("isla-cocina-ruedas.jpg",                   "screenshot"),# isla de cocina con ruedas - screenshot FB
    "IMG-20241103-WA0031.jpg": ("isla-multicolor-exterior.jpg",             "exterior"), # isla multicolor con bancos

    # ── MUEBLES ESPECIALES ───────────────────────────────────────────────────
    "IMG-20241103-WA0057.jpg": ("especiero-despensero-rustico.jpg",         "exterior"), # mueble especiero/despensero alto rústico
    "IMG-20241103-WA0072.jpg": ("mesa-bar-taburetes.jpg",                   "screenshot"),# mesa bar con taburetes - screenshot FB
    "IMG-20241103-WA0050.jpg": ("mueble-bar-bodega-taller.jpg",             "normal"),   # mueble bar/bodega con porta-botellas
    "IMG-20241103-WA0026.jpg": ("mueble-tv-rustico-ventanas.jpg",           "exterior"), # mueble TV rústico con ventanas laterales
    "IMG-20241103-WA0054.jpg": ("aparador-turquesa-cajones.jpg",            "screenshot"),# aparador turquesa muchos cajones - screenshot

    # ── SKIP ─────────────────────────────────────────────────────────────────
    "IMG-20241103-WA0065.jpg": ("skip",                                     "skip"),     # screenshot equipo de audio - no usar
}


def crop_black_bars(img, threshold=15, min_content_ratio=0.4):
    """Recorta barras negras superior e inferior (screenshots de WhatsApp/FB)."""
    w, h = img.size
    # Convertir a escala de grises para detectar negro
    gray = img.convert("L")
    pixels = list(gray.getdata())

    def row_is_black(y):
        row = pixels[y * w:(y + 1) * w]
        avg = sum(row) / len(row)
        return avg < threshold

    # Encontrar primer y último row no-negro
    top = 0
    while top < h and row_is_black(top):
        top += 1

    bottom = h - 1
    while bottom > top and row_is_black(bottom):
        bottom -= 1

    # Solo recortar si el contenido ocupa suficiente del original
    content_height = bottom - top + 1
    if content_height / h >= min_content_ratio and top > 5:
        return img.crop((0, top, w, bottom + 1))
    return img


def enhance_for_catalog(img, mode="normal"):
    """
    Aplica mejoras según el tipo de imagen:
    - normal: imágenes en living/ambientes reales (leve mejora)
    - oscura: fotos de taller/galpón oscuras (más brillo y contraste)
    - exterior: fotos al aire libre (equilibrar exposición)
    - screenshot: recortar barras y luego mejorar
    - watermark: tiene stickers pero imagen OK, mejorar igualmente
    """
    # Recortar barras negras para screenshots
    if mode == "screenshot":
        img = crop_black_bars(img)

    # Convertir a RGB si hace falta (evitar problemas con PNG o CMYK)
    if img.mode != "RGB":
        img = img.convert("RGB")

    if mode == "normal":
        # Imágenes en ambientes reales — toque suave
        img = ImageEnhance.Brightness(img).enhance(1.08)
        img = ImageEnhance.Contrast(img).enhance(1.12)
        img = ImageEnhance.Color(img).enhance(1.10)
        img = ImageEnhance.Sharpness(img).enhance(1.20)

    elif mode in ("oscura", "watermark"):
        # Fotos de taller oscuras — levantamos bastante
        img = ImageEnhance.Brightness(img).enhance(1.20)
        img = ImageEnhance.Contrast(img).enhance(1.25)
        img = ImageEnhance.Color(img).enhance(1.15)
        img = ImageEnhance.Sharpness(img).enhance(1.30)

    elif mode == "exterior":
        # Fotos al aire libre — equilibrar y calentar
        img = ImageEnhance.Brightness(img).enhance(1.05)
        img = ImageEnhance.Contrast(img).enhance(1.18)
        img = ImageEnhance.Color(img).enhance(1.12)
        img = ImageEnhance.Sharpness(img).enhance(1.25)

    elif mode == "screenshot":
        # Ya recortada arriba — mejorar
        img = ImageEnhance.Brightness(img).enhance(1.15)
        img = ImageEnhance.Contrast(img).enhance(1.20)
        img = ImageEnhance.Color(img).enhance(1.12)
        img = ImageEnhance.Sharpness(img).enhance(1.20)

    return img


def resize_for_web(img, max_w=MAX_WIDTH, max_h=MAX_HEIGHT):
    """Redimensiona manteniendo relación de aspecto, máximo max_w x max_h."""
    w, h = img.size
    if w <= max_w and h <= max_h:
        return img
    ratio = min(max_w / w, max_h / h)
    new_size = (int(w * ratio), int(h * ratio))
    return img.resize(new_size, Image.LANCZOS)


def process_all():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    processed = 0
    skipped   = 0
    errors    = 0

    for src_name, (dst_name, mode) in IMAGENES.items():
        src_path = os.path.join(INPUT_DIR, src_name)

        if mode == "skip" or dst_name == "skip":
            print(f"  [SKIP] {src_name}")
            skipped += 1
            continue

        if not os.path.exists(src_path):
            print(f"  [NOT FOUND] {src_name}")
            errors += 1
            continue

        try:
            img = Image.open(src_path)
            img = enhance_for_catalog(img, mode)
            img = resize_for_web(img)
            dst_path = os.path.join(OUTPUT_DIR, dst_name)
            img.save(dst_path, "JPEG", quality=QUALITY, optimize=True)
            w, h = img.size
            print(f"  [OK] {src_name} -> {dst_name}  [{w}x{h}]")
            processed += 1
        except Exception as e:
            print(f"  [ERROR] {src_name}: {e}")
            errors += 1

    print(f"\n{'='*50}")
    print(f"  Procesadas: {processed}")
    print(f"  Saltadas:   {skipped}")
    print(f"  Errores:    {errors}")
    print(f"  Salida:     {OUTPUT_DIR}/")
    print(f"{'='*50}")


if __name__ == "__main__":
    print("\nProcesando imagenes para catalogo Atelier...\n")
    process_all()
