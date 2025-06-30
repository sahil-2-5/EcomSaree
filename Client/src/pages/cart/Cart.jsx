import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const {
    cart,
    loading,
    error,
    fetchCart,
    removeCartItem,
    updateCartItem,
    getCartTotal,
    clearCart
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // NEW: Local update state

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      setIsUpdating(true);
      const result = await updateCartItem(productId, newQuantity);
      await fetchCart(); // Ensure cart is refreshed
      alert(result.message);
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    setIsUpdating(true);
    const result = await removeCartItem(productId);
    await fetchCart();
    alert(result.message);
    setIsUpdating(false);
  };

  const handleClearCart = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear your entire cart?");
    if (!confirmClear) return;

    setIsClearing(true);
    setIsUpdating(true);
    try {
      await clearCart();
      await fetchCart();
    } finally {
      setIsClearing(false);
      setIsUpdating(false);
    }
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 999 ? 0 : 99;
  const total = subtotal + shippingCost;

  if (loading || isUpdating) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4">
              Shopping Cart
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 border border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-600 hover:text-white text-pink-600 text-sm font-medium transition-all duration-300"
            >
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-20 pb-5">
          <div> 
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{cart.length} items in your cart</p> 
          </div>
          <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium transition-colors duration-300 w-full sm:w-auto"
            >
              {isClearing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full mr-2"></div>
                  Clearing...
                </>
              ) : (
                <>
                  <FiTrash2 className="w-4 h-4 mr-2" />
                  Clear All Items
                </>
              )}
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center space-x-6 border border-gray-200 hover:border-pink-200 p-6 transition-all duration-300 bg-white"
              >                
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product?.images[0]?.url || "/placeholder.jpg"}
                    alt={item.product.title || "Product"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-1">
                        {item.product.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">Available Qty: {item.product.availableQuantity}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{(item.product.sellingPrice)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                          className="p-2 text-gray-400 hover:text-pink-600 transition"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-2 text-sm font-medium text-gray-900 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                          className="p-2 text-gray-400 hover:text-pink-600 transition"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="p-2 text-gray-400 hover:text-pink-600 transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}

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
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString()}`}</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block">
                <button className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition">
                  Proceed to Checkout
                </button>
              </Link>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✔</span>
                  <span>Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✔</span>
                  <span>Secure checkout powered by Razorpay</span>
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
