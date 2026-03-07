import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-lg px-6">
        <div className="text-6xl mb-6">&#10003;</div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Thank you for your order. Your CFD-engineered aero components are being prepared for shipment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop" className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold uppercase tracking-wider transition-colors">
            Continue Shopping
          </Link>
          <Link to="/" className="px-8 py-3 border border-zinc-700 hover:border-zinc-500 font-bold uppercase tracking-wider transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
