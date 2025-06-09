import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 999 ? 0 : 99;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4">Shopping Cart</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-lg text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="inline-flex items-center px-8 py-3 border border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-600 hover:text-white text-pink-600 text-sm font-medium transition-all duration-300">
              Continue Shopping
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">Cart</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} items in your cart</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-6 border border-gray-200 hover:border-pink-200 p-6 transition-all duration-300 bg-white"
                >
                  <div className="h-32 w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-xs text-gray-500 uppercase mb-1 block">{item.material}</span>
                        <h3 className="text-base font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity, -1)
                          }
                          className="p-2 text-gray-400 hover:text-pink-600 transition-colors duration-300"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-2 text-sm font-medium text-gray-900 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity, 1)
                          }
                          className="p-2 text-gray-400 hover:text-pink-600 transition-colors duration-300"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-pink-600 transition-colors duration-300"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12">
              <Link to="/shop" className="inline-flex items-center px-6 py-3 border border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-600 hover:text-white text-pink-600 text-sm font-medium transition-all duration-300">
                Continue Shopping
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white border border-gray-200 p-8 space-y-6 sticky top-8">
              <div className="flex flex-col">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Summary</span>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Coupon Code */}
              <div>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-grow border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                  />
                  <button className="px-6 py-2 border border-gray-200 hover:border-pink-200 text-sm font-medium transition-colors duration-300">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? 'Free'
                      : `₹${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="block">
                <button className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Additional Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout powered by Razorpay</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>EMI options available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
