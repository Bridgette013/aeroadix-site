import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();

  const formatPrice = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0,
  }).format(price);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-zinc-400 mb-8">Add some aero components to get started.</p>
          <Link to="/shop" className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-wider transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-zinc-900 border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-zinc-500 flex gap-2">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 bg-zinc-900 border border-zinc-800 p-4">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/shop/${item.id}`} className="font-bold hover:text-blue-600 transition-colors">
                  {item.name}
                </Link>
                <p className="text-zinc-500 text-sm">{item.vehicle}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-zinc-700">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-zinc-800 transition-colors text-sm"
                    >-</button>
                    <span className="px-3 py-1 bg-zinc-950 border-x border-zinc-700 text-sm min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-zinc-800 transition-colors text-sm"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-400 text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(getCartTotal())}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="flex-1 text-center py-3 border border-zinc-700 hover:border-zinc-500 font-bold uppercase tracking-wider text-sm transition-colors">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="flex-1 text-center py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-sm transition-colors">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
