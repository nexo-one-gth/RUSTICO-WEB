import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import clsx from 'clsx'

interface Props {
  product: Product
  priority?: boolean
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491100000000'

export default function ProductCard({ product, priority = false }: Props) {
  const mainImage = product.images[0]
  const waText = encodeURIComponent(
    `Hola! Me interesa el ${product.name}. ¿Está disponible?`
  )

  return (
    <article className="product-card group flex flex-col">

      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-rustico-warm flex-shrink-0">
        <Image
          src={`/imagenes/${mainImage}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105 p-3"
          priority={priority}
        />

        {/* Badge disponible */}
        {product.price && (
          <div className="absolute top-3 left-3">
            <span className="tag-green text-[8px] bg-rustico-light/90 backdrop-blur-sm">
              Disponible
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag text-[8px]">{tag}</span>
          ))}
        </div>

        {/* Nombre */}
        <h3 className="font-body font-medium text-rustico-dark text-lg leading-snug mb-1">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="font-body font-light text-rustico-sand text-xs leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Material + dimensiones */}
        {product.dimensions && (
          <p className="font-body text-[10px] text-rustico-sand tracking-wide mb-3">
            📐 {product.dimensions}
          </p>
        )}

        {/* Separador */}
        <div className="w-full h-px bg-rustico-warm mb-4" />

        {/* Precio + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            {product.price ? (
              <>
                <span className="font-display text-2xl text-rustico-dark tracking-brand-xs leading-none">
                  ${product.price.toLocaleString('es-AR')}
                </span>
                <p className="font-body font-bold text-[9px] text-rustico-green tracking-brand-sm uppercase mt-0.5">
                  Envío incluido GBA
                </p>
              </>
            ) : (
              <span className="font-display text-xl text-rustico-brown tracking-brand-xs">
                Consultar
              </span>
            )}
          </div>

          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[10px] px-4 py-2.5 flex-shrink-0"
          >
            Consultar →
          </a>
        </div>
      </div>
    </article>
  )
}
