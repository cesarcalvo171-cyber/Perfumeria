import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ onExploreClick, featuredProducts = [], settings = {}, onOpenDetail, onAddToCart, favorites = [], onToggleFavorite }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const hasFeatured = featuredProducts && featuredProducts.length > 0;

  // Auto-play cards every 3 seconds when more than 3 featured
  useEffect(() => {
    if (!hasFeatured || featuredProducts.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % featuredProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredProducts, hasFeatured]);

  useEffect(() => {
    setCurrentIdx(0);
  }, [featuredProducts.length]);

  // Show up to 3 cards in a sliding window
  const visibleProducts = hasFeatured
    ? [0, 1, 2].map(offset => featuredProducts[(currentIdx + offset) % featuredProducts.length]).filter(Boolean)
    : [];

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT: Text Content */}
          <div className="lg:col-span-5 space-y-6 text-left z-10">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFC107]">
                {settings.hero_badge || 'Colección Oficial'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] uppercase">
                {settings.hero_title || settings.heroTitle || (
                  <>
                    ENCUENTRA<br />
                    <span className="italic font-serif font-light text-[#FFC107]">TU</span>{' '}
                    FRAGANCIA
                  </>
                )}
              </h1>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-sm">
              {settings.hero_subtitle || settings.heroSubtitle || 'Perfumes de larga duración que combinan con tu estado de ánimo, estilo y personalidad.'}
            </p>

            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 bg-[#FFC107] hover:bg-[#FFD54F] text-black px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_0_24px_rgba(255,193,7,0.25)] hover:shadow-[0_0_36px_rgba(255,193,7,0.4)] cursor-pointer"
              >
                {settings.hero_cta || settings.heroCta || 'Explorar Colección'}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {hasFeatured && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <span className="font-bold text-white">{featuredProducts.length}</span>
                  <span>destacados</span>
                </div>
              )}
            </div>

            {/* Dot indicators when > 3 featured */}
            {hasFeatured && featuredProducts.length > 3 && (
              <div className="flex gap-1.5 pt-2">
                {featuredProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentIdx ? 'bg-[#FFC107] w-4' : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Featured Product Cards */}
          <div className="lg:col-span-7">
            {hasFeatured ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product, slotIdx) => {
                    const variant = product.product_variants?.[0];
                    const image = variant?.image_url || product.image || '/images/liquid_brun.png';
                    const sizes = variant?.sizes || [];
                    const firstSize = sizes[0] || 'Única';
                    const resolvedPrice = variant?.price_by_size?.[firstSize] ?? product.price ?? 0;
                    const resolvedOriginal = variant?.original_price_by_size?.[firstSize] || product.original_price || null;
                    const isFav = favorites.includes(product.id);

                    return (
                      <motion.div
                        key={`${product.id}-${slotIdx}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: slotIdx * 0.07 }}
                        className={`relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-[#FFC107]/40 rounded-xl p-4 flex flex-col gap-3 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,193,7,0.08)] ${
                          slotIdx === 2 ? 'hidden lg:flex' : ''
                        }`}
                        onClick={() => onOpenDetail && onOpenDetail(product)}
                      >
                        {/* Category badge */}
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] uppercase tracking-widest font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                            {product.category || 'Perfume'}
                          </span>
                          <button
                            onClick={e => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(product.id); }}
                            className="p-1 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <Heart
                              size={14}
                              className={isFav ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 hover:text-rose-400'}
                            />
                          </button>
                        </div>

                        {/* Product Image */}
                        <div className="relative flex justify-center items-center h-32 overflow-hidden rounded-lg bg-zinc-800/40">
                          <div className="absolute inset-0 bg-[#FFC107]/5 blur-2xl rounded-full scale-75 pointer-events-none" />
                          <img
                            src={image}
                            alt={product.name}
                            className="h-28 w-full object-contain object-center drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-1">
                          <h3 className="text-white text-xs font-bold uppercase tracking-wider truncate">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[#FFC107] font-bold text-sm">
                                ${Number(resolvedPrice).toFixed(2)}
                              </span>
                              {resolvedOriginal && (
                                <span className="text-zinc-600 text-[10px] line-through">
                                  ${Number(resolvedOriginal).toFixed(2)}
                                </span>
                              )}
                            </div>
                            {firstSize !== 'Única' && (
                              <span className="text-[9px] text-zinc-600 border border-zinc-700 px-1.5 py-0.5 rounded-full">
                                {firstSize}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add to cart */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onAddToCart && onAddToCart(product, 1, firstSize, { name: variant?.color_name || 'Variante 1', hex: variant?.color_hex || '#000' });
                          }}
                          className="w-full bg-[#FFC107]/10 hover:bg-[#FFC107] text-[#FFC107] hover:text-black text-[9px] font-bold uppercase tracking-widest py-2 rounded-lg border border-[#FFC107]/20 hover:border-[#FFC107] transition-all duration-300 cursor-pointer"
                        >
                          Agregar al Carrito
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              /* Placeholder when no featured products */
              <div className="flex justify-center items-center h-48 rounded-xl border border-dashed border-zinc-800 text-zinc-600 text-xs text-center">
                <p>Marca productos como <span className="text-[#FFC107]">Destacados</span> en el Panel Admin<br />para verlos aquí.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
