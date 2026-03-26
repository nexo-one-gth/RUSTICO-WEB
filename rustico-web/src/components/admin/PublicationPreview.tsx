'use client'

import { useState, useRef } from 'react'
import { Product } from '@/types'
import { products } from '@/lib/products'

interface PublicationPreviewProps {
    initialProductId?: string
}

export default function PublicationPreview({ initialProductId }: PublicationPreviewProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
        initialProductId ? products.find(p => p.id === initialProductId) : products[0]
    )
    const [view, setView] = useState<'feed' | 'story'>('feed')
    const [generating, setGenerating] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleDownload = async () => {
        if (!selectedProduct) return
        setGenerating(true)

        try {
            const canvas = canvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            const W = 1080, H = 1350
            canvas.width = W
            canvas.height = H

            // 1. Background Image
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = `/imagenes/${selectedProduct.images[0]}`

            await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })

            await document.fonts.ready

            const iRatio = img.naturalWidth / img.naturalHeight
            const cRatio = W / H
            let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
            if (iRatio > cRatio) { sw = sh * cRatio; sx = (img.naturalWidth - sw) / 2 }
            else { sh = sw / cRatio; sy = (img.naturalHeight - sh) / 2 }
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)

            // 2. Gradient Overlay
            const grad = ctx.createLinearGradient(0, H, 0, 0)
            grad.addColorStop(0, 'rgba(44,24,16,0.93)')
            grad.addColorStop(0.45, 'rgba(44,24,16,0.42)')
            grad.addColorStop(1, 'rgba(44,24,16,0.06)')
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, W, H)

            // 3. Brand Elements
            ctx.fillStyle = 'rgba(200,169,110,0.85)'
            ctx.font = '500 38px "Plus Jakarta Sans Variable"'
            ctx.fillText('Rústico', 54, 72)

            // 4. Content
            const PAD = 54
            let y = H - 52

            // Shipping
            ctx.font = '700 21px "Plus Jakarta Sans Variable"'
            ctx.fillStyle = '#c8a96e'
            ctx.fillText('ENVÍO INCLUIDO GBA', PAD, y)
            y -= 12

            // Price
            ctx.font = '400 118px "Bebas Neue"'
            y -= 112
            ctx.fillText(selectedProduct.price ? `$${selectedProduct.price.toLocaleString()}` : 'CONSULTAR', PAD, y)
            y -= 24

            // Specs
            ctx.font = '300 27px "Plus Jakarta Sans Variable"'
            ctx.fillStyle = 'rgba(245,240,232,0.76)'
            ctx.fillText(selectedProduct.material, PAD, y)
            y -= 42

            // Name
            ctx.font = '400 88px "Bebas Neue"'
            ctx.fillStyle = '#f5f0e8'
            ctx.fillText(selectedProduct.name.toUpperCase(), PAD, y)

            // 5. Download
            const link = document.createElement('a')
            link.download = `rustico-${selectedProduct.id}.jpg`
            link.href = canvas.toDataURL('image/jpeg', 0.95)
            link.click()

        } catch (err) {
            console.error('Error generating image:', err)
            alert('Error al generar la imagen. Asegúrate de estar corriendo en un servidor local.')
        } finally {
            setGenerating(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
                {products.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={`px-3 py-1 text-[10px] tracking-brand uppercase border ${selectedProduct?.id === p.id
                            ? 'bg-rustico-gold border-rustico-gold text-rustico-dark'
                            : 'border-rustico-brown text-rustico-sand hover:text-rustico-cream'
                            }`}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            {selectedProduct && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Mockup Column */}
                    <div className="space-y-4">
                        <div className="flex gap-px">
                            <button
                                onClick={() => setView('feed')}
                                className={`flex-1 py-2 text-[10px] tracking-brand uppercase font-bold ${view === 'feed' ? 'bg-rustico-dark text-rustico-gold' : 'bg-rustico-brown/50 text-rustico-sand'}`}
                            >
                                Feed 4:5
                            </button>
                            <button
                                onClick={() => setView('story')}
                                className={`flex-1 py-2 text-[10px] tracking-brand uppercase font-bold ${view === 'story' ? 'bg-rustico-dark text-rustico-gold' : 'bg-rustico-brown/50 text-rustico-sand'}`}
                            >
                                Stories 9:16
                            </button>
                        </div>

                        <div className={`relative bg-black overflow-hidden flex items-center justify-center ${view === 'feed' ? 'aspect-[4/5]' : 'aspect-[9/16]'}`}>
                            <img
                                src={`/imagenes/${selectedProduct.images[0]}`}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-rustico-dark/90 via-rustico-dark/40 to-transparent" />

                            <div className="absolute top-6 left-6 text-xl font-display text-rustico-gold/80">Rústico</div>

                            <div className="absolute bottom-6 left-6 right-6 text-rustico-cream">
                                <div className="tag mb-2">Pieza Única</div>
                                <div className="font-display text-4xl leading-none mb-1">{selectedProduct.name}</div>
                                <div className="font-body text-[10px] text-rustico-sand mb-4 opacity-80">{selectedProduct.material}</div>
                                <div className="font-display text-5xl text-rustico-gold">{selectedProduct.price ? `$${selectedProduct.price.toLocaleString()}` : 'CONSULTAR'}</div>
                                <div className="font-body text-[9px] tracking-brand text-rustico-gold uppercase mt-1">Precio fábrica · Envío incluido GBA</div>
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={generating}
                            className="w-full btn-primary disabled:opacity-50"
                        >
                            {generating ? '⏳ Generando...' : 'Descargar con diseño'}
                        </button>
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Caption Column */}
                    <div className="space-y-6">
                        <div className="bg-rustico-dark border border-rustico-brown p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase">Caption Instagram</p>
                                <button
                                    onClick={() => navigator.clipboard.writeText(`${selectedProduct.description}\n\n#rustico #muebles #industrial`)}
                                    className="btn-ghost !px-4 !py-1 !text-[9px]"
                                >
                                    Copiar
                                </button>
                            </div>
                            <div className="font-body text-rustico-cream text-xs whitespace-pre-wrap leading-relaxed">
                                {selectedProduct.description}
                                {"\n\n"}
                                🌿 Madera reciclada + diseño artesanal{"\n"}
                                🤝 Taller propio en González Catán{"\n"}
                                🚚 Envío a todo GBA incluido{"\n\n"}
                                #rustico #mueblesunicos #industrial #hechoamano #mueblesargentina #maderarestaurada
                            </div>
                        </div>

                        <div className="bg-rustico-dark border border-rustico-brown p-6">
                            <p className="font-body text-rustico-sand text-[9px] tracking-brand uppercase mb-4">Facebook Marketplace</p>
                            <div className="font-body text-rustico-cream text-xs">
                                <strong>Título:</strong> {selectedProduct.name} Rústico Industrial Madera Reciclada Living{"\n\n"}
                                <strong>Descripción:</strong>{"\n"}
                                Mueble artesanal fabricado con madera recuperada. Diseño industrial robusto y con carácter.{"\n\n"}
                                ✅ Madera tratada{"\n"}
                                ✅ Hierro reforzado{"\n"}
                                ✅ Hecho a mano{"\n"}
                                💰 Precio directo de fábrica.{"\n\n"}
                                Consultanos!
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
