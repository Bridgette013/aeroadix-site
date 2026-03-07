import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = ({ className = '' }) => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link
      to="/cart"
      className={`relative inline-flex items-center justify-center p-2 text-white hover:text-blue-600 transition-colors ${className}`}
      aria-label={`Cart (${itemCount} items)`}
    >
      {/* Cart SVG */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>

      {/* Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
