import React, { useState } from 'react';
import { FiEye, FiDownload } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';

const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order #{order.id}
          </h2>
          
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Customer Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Name:</span> {order.customer.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {order.customer.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Shipping Address
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">{order.shippingAddress.line1}</p>
              <p className="text-sm text-gray-600">{order.shippingAddress.line2}</p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Order Items
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Order Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">₹{order.shipping.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-600">
                    -₹{order.discount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-medium pt-2 border-t">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Status
              </label>
              <select
                value={order.status}
                onChange={(e) => console.log(e.target.value)}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample orders data
  const orders = [
    {
      id: 'ORD123',
      customer: {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 9876543210',
      },
      shippingAddress: {
        line1: '123, Park Street',
        line2: 'Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
      items: [
        {
          id: 1,
          name: 'Banarasi Silk Saree',
          quantity: 2,
          price: 15999,
        },
      ],
      subtotal: 31998,
      shipping: 0,
      discount: 0,
      total: 31998,
      status: 'processing',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
    },
    // Add more orders...
  ];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleExportOrders = () => {
    // Implement export logic here
    console.log('Export orders');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <button
            onClick={handleExportOrders}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiDownload className="w-5 h-5 mr-2" />
            Export Orders
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-gray-600 hover:text-pink-600"
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </AdminLayout>
  );
};

export default Orders;
