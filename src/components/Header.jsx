import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sun, Moon, Menu, X, Check } from 'lucide-react';

export default function Header({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  isAdmin
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">

      {/* Main Navbar */}
      <div className="w-full bg-transparent border-b border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <a href="#" className="flex flex-col items-start justify-center text-white select-none hover:opacity-80 transition-opacity">
              <div className="text-left leading-none flex gap-2 items-baseline">
                <span className="block text-xl font-sans tracking-wide font-bold capitalize">Aromatico</span>
              {/*
               <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline-block">Rihan</span>
                */ }
              </div>
            </a>
          </div>

          {/* Removed Desktop Categories Menu as per user request */}
          <nav className="hidden lg:flex space-x-8 text-xs font-normal tracking-wide text-zinc-400">
          </nav>

          {/* Actions & Search */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search toggler / input */}
            <div className="relative flex items-center">
              {showSearch ? (
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200/55 dark:border-zinc-800">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar fragancias..."
                    className="bg-transparent text-xs w-28 sm:w-44 focus:outline-none text-zinc-950 dark:text-white"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearch(false);
                    }}
                    className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Favorites Icon */}
            {!isAdmin && (
              <button
                onClick={onOpenFavorites}
                className="relative text-zinc-400 hover:text-white p-2 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer bg-zinc-900/50"
                aria-label="Favorites"
              >
                <Heart size={16} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold scale-100 animate-pulse">
                    {favoritesCount}
                  </span>
                )}
              </button>
            )}

            {/* Cart Icon */}
            {!isAdmin && (
              <button
                onClick={onOpenCart}
                className="relative text-zinc-400 hover:text-white p-2 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer bg-zinc-900/50"
                aria-label="Cart"
              >
                <ShoppingBag size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFC107] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-colors">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-900 bg-[#FAF9F6] dark:bg-zinc-950 px-4 py-4 space-y-3 transition-all duration-300">
            <p className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-600 uppercase mb-2">Categorías</p>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-lg text-sm tracking-wide uppercase flex justify-between items-center ${
                  selectedCategory === category
                    ? 'bg-zinc-200/50 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50'
                }`}
              >
                {category}
                {selectedCategory === category && <Check size={14} className="text-zinc-900 dark:text-white" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
