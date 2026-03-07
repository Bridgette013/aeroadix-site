import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, getFeaturedProducts } from '../utils/productData';

const Shop = () => {
  const [filter, setFilter] = useState('all');

  const vehicles = [...new Set(products.map(p => p.vehicle))];
  const filtered = filter === 'all' ? products : products.filter(p => p.vehicle === filter);
  const featured = getFeaturedProducts();

  const formatPrice = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-zinc-900 border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-zinc-500 flex gap-2">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">
            AERO <span className="text-blue-600">COMPONENTS</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            CFD-engineered, 3D-printed performance aero components. Direct fit bolt-on.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 text-xs uppercase tracking-wider font-bold border transition-colors ${
              filter === 'all' ? 'border-blue-600 text-blue-600' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            All
          </button>
          {vehicles.map(v => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-bold border transition-colors ${
                filter === v ? 'border-blue-600 text-blue-600' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="bg-zinc-900 border border-zinc-800 hover:border-blue-600 transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest">{product.vehicle}</span>
                <h3 className="text-lg font-bold mt-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-blue-600 font-bold text-lg">{formatPrice(product.price)}</span>
                  {product.featured && (
                    <span className="text-[9px] uppercase tracking-widest font-bold text-yellow-500">Featured</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
