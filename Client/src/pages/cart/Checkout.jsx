import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
  });

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 999 ? 0 : 99;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement order submission logic here
    // After successful order placement:
    clearCart();
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-pink-700 uppercase bg-pink-50 border border-pink-100 mb-4 w-fit">Checkout</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Please fill in your details to proceed with the purchase</p>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 p-8">
                <div className="flex flex-col mb-8">
                  <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Step 1</span>
                  <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 p-8 mt-8">
                <div className="flex flex-col mb-8">
                  <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Step 2</span>
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      PIN Code
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-200 px-4 py-2 text-sm focus:border-pink-200 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-200 p-8 mt-8">
                <div className="flex flex-col mb-8">
                  <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Step 3</span>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                    />
                    <label
                      htmlFor="card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                    />
                    <label
                      htmlFor="upi"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      UPI
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                    />
                    <label
                      htmlFor="cod"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white border border-gray-200 p-8 sticky top-8">
              <div className="flex flex-col mb-8">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Summary</span>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase mb-2">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-100 mt-6 pt-6 space-y-4">
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
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors duration-300 mt-8"
                onClick={handleSubmit}
              >
                Place Order
              </button>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout powered by Razorpay</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
