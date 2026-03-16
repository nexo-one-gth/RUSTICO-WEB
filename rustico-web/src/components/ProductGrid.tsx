'use client'
import { useState } from 'react'
import { Product, ProductCategory } from '@/types'
import { CATEGORY_LABELS, products, ALL_CATEGORIES } from '@/lib/products'
import ProductCard from './ProductCard'
import clsx from 'clsx'

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? products.filter((p) => p.available)
    : products.filter((p) => p.category === activeCategory && p.available)

  // Categorías que tienen al menos un producto
  const categoriesWithProducts = ALL_CATEGORIES.filter(
    (cat) => products.some((p) => p.category === cat && p.available)
  )

  return (
    <section id="catalogo" className="bg-rustico-light py-20 sm:py-28">

      {/* Header de sección */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <p className="eyebrow mb-4">Catálogo Completo</p>
        <h2 className="font-display text-rustico-dark text-[clamp(40px,7vw,72px)] tracking-brand-xs leading-none mb-4">
          NUESTRAS PIEZAS
        </h2>
        <p className="font-body font-light text-rustico-sand text-sm max-w-md">
          Cada mueble fue fabricado a mano en nuestro taller. Consultá disponibilidad — algunas piezas ya tienen dueño.
        </p>
      </div>

      {/* Filtros de categoría */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-wrap gap-2">

          {/* Todos */}
          <button
            onClick={() => setActiveCategory('all')}
            className={clsx(
              'font-body font-bold text-[10px] tracking-brand-sm uppercase px-4 py-2 border transition-colors duration-300',
              activeCategory === 'all'
                ? 'bg-rustico-dark text-rustico-gold border-rustico-dark'
                : 'border-rustico-warm text-rustico-sand hover:border-rustico-gold hover:text-rustico-gold'
            )}
          >
            Todos
          </button>

          {categoriesWithProducts.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'font-body font-bold text-[10px] tracking-brand-sm uppercase px-4 py-2 border transition-colors duration-300',
                activeCategory === cat
                  ? 'bg-rustico-dark text-rustico-gold border-rustico-dark'
                  : 'border-rustico-warm text-rustico-sand hover:border-rustico-gold hover:text-rustico-gold'
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 3}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-rustico-sand py-20">
            No hay productos en esta categoría por el momento.
          </p>
        )}
      </div>
    </section>
  )
}
