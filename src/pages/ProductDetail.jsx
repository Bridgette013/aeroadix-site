import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById, products } from '../utils/productData';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addItem, isInCart, getCartItem } = useCart();
  const navigate = useNavigate();

  const product = getProductById(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-[#00BFFF] hover:underline">← Back to Shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.vehicle === product.vehicle).slice(0, 3);

  const formatPrice = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0
  }).format(price);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-zinc-500 flex gap-2">
            <Link to="/" className="hover:text-[#00BFFF]">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#00BFFF]">Shop</Link>
            <span>/</span>
            <span className="text-zinc-300">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Gallery */}
          <div>
            <div className="aspect-[4/3] bg-zinc-900 border border-zinc-800 overflow-hidden mb-4">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-zinc-900 border overflow-hidden transition-colors ${
                      selectedImage === index ? 'border-[#00BFFF]' : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-sm uppercase tracking-wider">
                {product.vehicle}
              </span>
              {product.featured && (
                <span className="px-3 py-1 bg-[#00BFFF] text-black text-sm font-bold uppercase tracking-wider">
                  Featured
                </span>
              )}
              {product.inStock ? (
                <span className="px-3 py-1 bg-green-900/30 text-green-400 text-sm uppercase tracking-wider">In Stock</span>
              ) : (
                <span className="px-3 py-1 bg-red-900/30 text-red-400 text-sm uppercase tracking-wider">Made to Order</span>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.savings && (
                <span className="text-green-400 text-lg">Save ${product.savings} vs individual</span>
              )}
            </div>

            <p className="text-zinc-400 mb-8 text-lg leading-relaxed">{product.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center border border-zinc-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-zinc-800 transition-colors"
                  >−</button>
                  <span className="px-6 py-3 bg-zinc-950 border-x border-zinc-700 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-zinc-800 transition-colors"
                  >+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase tracking-wider transition-colors border border-zinc-700"
              >
                {addedFeedback ? '✓ Added to Cart' : isInCart(product.id) ? 'Add More to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#00BFFF] hover:bg-[#0099CC] text-black font-bold uppercase tracking-wider transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* SKU */}
            <p className="text-xs text-zinc-600 mb-8">SKU: {product.sku}</p>

            {/* Features */}
            {product.features && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">What's Included</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400">
                      <span className="text-[#00BFFF] mt-1 flex-shrink-0">▸</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs */}
            {product.specifications && (
              <div className="bg-zinc-900 border border-zinc-800 p-6">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Specifications</h3>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 text-sm">
                      <dt className="text-zinc-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                      <dd className="text-zinc-300">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Package components (STI bundle) */}
        {product.packageComponents && (
          <div className="mt-16 bg-zinc-900 border border-zinc-800 p-8">
            <h2 className="text-2xl font-bold mb-6">Package Breakdown</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {product.packageComponents.map((component, i) => (
                <div key={i} className="text-center p-4 bg-zinc-950 border border-zinc-800">
                  <p className="font-bold text-sm mb-1">{component.name}</p>
                  <p className="text-zinc-500 text-xs">${component.value} individually</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-green-400 font-bold text-lg">
              Bundle saves you ${product.savings} — {formatPrice(product.price)} total
            </p>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">More for {product.vehicle.split(' ')[0]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/shop/${p.id}`}
                  className="bg-zinc-900 border border-zinc-800 hover:border-[#00BFFF] transition-colors group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="font-bold group-hover:text-[#00BFFF] transition-colors">{p.name}</p>
                    <p className="text-[#00BFFF] font-bold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
