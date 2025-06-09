import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiMail, FiPhone } from 'react-icons/fi';
import Button from '../../components/common/Button';

const OrderConfirmation = () => {
  // Sample order data (replace with actual data from your backend)
  const order = {
    id: 'ORD123456789',
    date: new Date().toLocaleDateString(),
    total: 16098,
    paymentMethod: 'Credit Card',
    estimatedDelivery: '5-7 business days',
    items: [  
      {
        id: 1,
        name: 'Banarasi Silk Saree',
        price: 15999,
        quantity: 1,
        image: '/images/saree1.jpg',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white pt-18">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 p-12">
          {/* Order Success Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wide text-green-700 uppercase bg-green-50 border border-green-100 mb-6">Order Confirmed</span>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <FiCheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-gray-600">
              Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="border-t border-gray-100 pt-12">
            <div className="mb-12">
              <div className="flex flex-col mb-8">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Details</span>
                <h2 className="text-xl font-bold text-gray-900">Order Information</h2>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase">Order Number</p>
                  <p className="font-medium text-gray-900">{order.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase">Order Date</p>
                  <p className="font-medium text-gray-900">{order.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase">Total Amount</p>
                  <p className="font-medium text-gray-900">₹{order.total.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase">Payment Method</p>
                  <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-12">
              <div className="flex flex-col mb-6">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Delivery</span>
                <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50/50 border border-green-100">
                <FiClock className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">Estimated Delivery Time</p>
                  <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-12">
              <div className="flex flex-col mb-6">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Address</span>
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>
              <div className="text-sm space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.name}
                </p>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p className="text-gray-600">{order.shippingAddress.pincode}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-12">
              <div className="flex flex-col mb-6">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Products</span>
                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
              </div>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 border border-gray-200 p-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 uppercase mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="border-t border-gray-100 pt-12">
              <div className="flex flex-col mb-6">
                <span className="text-xs font-medium tracking-wide text-pink-700 uppercase mb-2">Support</span>
                <h2 className="text-xl font-bold text-gray-900">Need Help?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50/50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Email Support</p>
                    <a
                      href="mailto:support@sareeshop.com"
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      support@sareeshop.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50/50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                    <FiPhone className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Phone Support</p>
                    <a
                      href="tel:1800123456"
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      1800-123-456
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop" className="inline-flex items-center px-8 py-3 border border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-600 hover:text-white text-pink-600 text-sm font-medium transition-all duration-300">
              Continue Shopping
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button className="inline-flex items-center px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors duration-300">
              Track Order
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
