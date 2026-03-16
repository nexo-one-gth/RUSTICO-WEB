"""
Generador de imagenes de catalogo con logo Rustico
- Procesa las fotos profesionales nuevas (MESA DE ARRIME, RACK TV)
- Procesa todas las imagenes de catalogo existentes
- Aplica logo con fondo transparente en esquina inferior derecha
- Guarda en imagenes-catalogo-branded/
"""

from PIL import Image, ImageEnhance
import os

# ── Rutas ────────────────────────────────────────────────────────────────────
LOGO_PATH    = "imagenes/logo.png"
SRC_PROC     = "imagenes-catalogo"          # procesadas existentes
SRC_NEW      = "imagenes"                   # nuevas fotos profesionales
OUTPUT_DIR   = "imagenes-catalogo-branded"

MAX_SIZE     = 1200
QUALITY      = 88

# Opacidad del logo (0–255). 200 = visible pero no invasivo
LOGO_ALPHA   = 200
# Logo ocupa este % del ancho de la imagen
LOGO_PCT     = 0.22
# Margen desde los bordes
MARGIN_PCT   = 0.025


# ── Nuevas fotos profesionales a procesar ────────────────────────────────────
NUEVAS = {
    "MESA DE ARRIME 1 (1).jpeg": ("mesa-arrime-frente-cajones.jpg",   "normal"),
    "MESA DE ARRIME 1 (2).jpeg": ("mesa-arrime-natural-cesta.jpg",    "normal"),
    "MESA DE ARRIME 1 (3).jpeg": ("mesa-arrime-verde-baldas.jpg",     "normal"),
    "MESA DE ARRIME 1 (4).jpeg": ("mesa-arrime-rustica-cajones.jpg",  "normal"),
    "MESA DE ARRIME 1 (5).jpeg": ("mesa-arrime-natural-puertas.jpg",  "normal"),
    "RACK TV (1).jpeg":               ("rack-tv-turquesa-fucsia-01.jpg",   "normal"),
    "RACK TV (2).jpeg":               ("rack-tv-turquesa-lateral.jpg",     "normal"),
    "RACK TV (3).jpeg":               ("rack-tv-turquesa-fucsia-02.jpg",   "normal"),
    "RACK TV (4).jpeg":               ("rack-tv-turquesa-fucsia-03.jpg",   "normal"),
    "REFERENCIA VARIOS (1).jpeg":     ("referencia-varios-01.jpg",         "normal"),
    "REFERENCIA VARIOS (2).jpeg":     ("referencia-varios-02.jpg",         "normal"),
    "REFERENCIA VARIOS (3).jpeg":     ("referencia-varios-03.jpg",         "normal"),
    "REFERENCIA VARIOS (4).jpeg":     ("referencia-varios-04.jpg",         "normal"),
}


# ── Preparar logo con fondo transparente ────────────────────────────────────
def preparar_logo(path):
    """Carga el logo PNG con transparencia nativa, devuelve imagen RGBA."""
    return Image.open(path).convert("RGBA")


def resize_logo(logo_rgba, target_w):
    """Redimensiona el logo manteniendo aspecto al ancho target."""
    lw, lh = logo_rgba.size
    ratio = target_w / lw
    new_size = (target_w, int(lh * ratio))
    return logo_rgba.resize(new_size, Image.LANCZOS)


def aplicar_alpha(logo_rgba, alpha):
    """Aplica opacidad global al canal alpha del logo."""
    r, g, b, a = logo_rgba.split()
    a = a.point(lambda p: int(p * alpha / 255))
    return Image.merge("RGBA", (r, g, b, a))


def agregar_logo(img, logo_rgba, margin_px):
    """
    Pega el logo en la esquina inferior derecha de img.
    img puede ser RGB o RGBA.
    """
    base = img.convert("RGBA")
    lw, lh = logo_rgba.size
    bw, bh = base.size

    x = bw - lw - margin_px
    y = bh - lh - margin_px

    base.paste(logo_rgba, (x, y), logo_rgba)

    return base.convert("RGB")


def mejorar(img, mode="normal"):
    if img.mode != "RGB":
        img = img.convert("RGB")
    if mode == "normal":
        img = ImageEnhance.Brightness(img).enhance(1.06)
        img = ImageEnhance.Contrast(img).enhance(1.14)
        img = ImageEnhance.Color(img).enhance(1.10)
        img = ImageEnhance.Sharpness(img).enhance(1.25)
    elif mode == "oscura":
        img = ImageEnhance.Brightness(img).enhance(1.20)
        img = ImageEnhance.Contrast(img).enhance(1.25)
        img = ImageEnhance.Color(img).enhance(1.15)
        img = ImageEnhance.Sharpness(img).enhance(1.30)
    return img


def resize_max(img, max_px=MAX_SIZE):
    w, h = img.size
    if w <= max_px and h <= max_px:
        return img
    ratio = min(max_px / w, max_px / h)
    return img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)


def procesar(src_path, dst_path, logo_rgba, mode="normal"):
    img = Image.open(src_path)
    img = mejorar(img, mode)
    img = resize_max(img)

    margin = max(int(img.width * MARGIN_PCT), 14)
    logo_w = max(int(img.width * LOGO_PCT), 80)
    logo   = resize_logo(logo_rgba, logo_w)
    logo   = aplicar_alpha(logo, LOGO_ALPHA)

    img = agregar_logo(img, logo, margin)
    img.save(dst_path, "JPEG", quality=QUALITY, optimize=True)
    print(f"  [OK] {os.path.basename(src_path):45s} -> {os.path.basename(dst_path)}")


# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("\nCargando y preparando logo...")
    logo_rgba = preparar_logo(LOGO_PATH)
    print(f"  Logo cargado: {logo_rgba.size[0]}x{logo_rgba.size[1]} px\n")

    ok = err = 0

    # 1. Nuevas fotos profesionales
    print("--- Fotos profesionales nuevas ---")
    for src_name, (dst_name, mode) in NUEVAS.items():
        src = os.path.join(SRC_NEW, src_name)
        dst = os.path.join(OUTPUT_DIR, dst_name)
        if not os.path.exists(src):
            print(f"  [NO ENCONTRADO] {src_name}")
            err += 1
            continue
        try:
            procesar(src, dst, logo_rgba, mode)
            ok += 1
        except Exception as e:
            print(f"  [ERROR] {src_name}: {e}")
            err += 1

    # 2. Imagenes procesadas existentes
    print(f"\n--- Imagenes del catalogo existente ({SRC_PROC}/) ---")
    for fname in sorted(os.listdir(SRC_PROC)):
        if not fname.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        src = os.path.join(SRC_PROC, fname)
        dst = os.path.join(OUTPUT_DIR, fname)
        try:
            procesar(src, dst, logo_rgba, "normal")
            ok += 1
        except Exception as e:
            print(f"  [ERROR] {fname}: {e}")
            err += 1

    print(f"\n{'='*54}")
    print(f"  OK:     {ok}")
    print(f"  Errores: {err}")
    print(f"  Salida:  {OUTPUT_DIR}/")
    print(f"{'='*54}\n")


if __name__ == "__main__":
    main()
