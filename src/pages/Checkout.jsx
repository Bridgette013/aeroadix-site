import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0,
  }).format(price);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Nothing to Checkout</h1>
          <Link to="/shop" className="text-blue-600 hover:underline">Browse the shop</Link>
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
            <Link to="/cart" className="hover:text-blue-600">Cart</Link>
            <span>/</span>
            <span className="text-zinc-300">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Contact Information</h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email" required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
                  <input type="text" placeholder="Last Name" required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
                </div>
                <input type="text" placeholder="Address" required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="City" required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
                  <input type="text" placeholder="State" required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
                  <input type="text" placeholder="ZIP" required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 focus:border-blue-600 outline-none transition-colors" />
                </div>
              </div>
            </div>

            <button type="submit"
              className="w-full py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-wider transition-colors">
              Place Order — {formatPrice(getCartTotal())}
            </button>
          </form>

          <div>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Order Summary</h2>
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-zinc-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-blue-600">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
