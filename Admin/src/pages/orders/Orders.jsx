import React, { useState, useEffect } from "react";
import { FiEye, FiDownload, FiUser, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import { useOrderContext } from "../../context/OrderContext";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { orders, loading, error, fetchAllOrders } = useOrderContext();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Calculate status counts
  const statusCount = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    processing: orders.filter((o) => o.orderStatus === "processing").length,
    shipped: orders.filter((o) => o.orderStatus === "shipped").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || order.orderStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    console.log("Export orders");
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "razorpay":
        return "UPI/Cards";
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiDownload className="w-5 h-5 mr-2" />
            Export Orders
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">{statusCount.total}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-xl font-bold text-gray-600">
              {statusCount.pending}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Processing</p>
            <h2 className="text-xl font-bold text-yellow-600">
              {statusCount.processing}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Shipped</p>
            <h2 className="text-xl font-bold text-blue-600">
              {statusCount.shipped}
            </h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Delivered</p>
            <h2 className="text-xl font-bold text-green-600">
              {statusCount.delivered}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="border px-4 py-2 rounded w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="border px-3 py-2 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="border px-3 py-2 rounded">
            <option>Date Range</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 uppercase">
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Items</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      {order.orderId}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-gray-400" />
                      <div>
                        <div className="text-gray-800 font-medium">
                          {order.shippingAddress.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.shippingAddress.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="p-4 text-gray-700">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-700">
                    {getPaymentMethodIcon(order.paymentMethod)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(order.orderStatus)}`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      title="View Order"
                      className="hover:text-pink-600"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FiCalendar className="mr-2" />
                Order Information
              </h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Order ID:</span> {order.orderId}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Date:</span> {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Status:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${order.orderStatus === 'pending' ? 'bg-gray-100 text-gray-800' : 
                                  order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                                  order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-green-100 text-green-800'}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FiUser className="mr-2" />
                Customer Details
              </h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Name:</span> {order.shippingAddress.name}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Email:</span> {order.shippingAddress.email}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Phone:</span> {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <FiMapPin className="mr-2" />
              Shipping Address
            </h3>
            <div className="text-sm">
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>Pincode: {order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Method</p>
                <p>{order.paymentMethod === 'razorpay' ? 'UPI/Credit Card' : order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="capitalize">{order.paymentStatus}</p>
              </div>
              <div>
                <p className="text-gray-500">Paid At</p>
                <p>{order.paidAt ? new Date(order.paidAt).toLocaleString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p>₹{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-500">
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-3">
                        <div className="font-medium">Product ID: {item.product}</div>
                        <div className="text-xs text-gray-500">SKU: {item._id}</div>
                      </td>
                      <td className="p-3">₹{item.price.toLocaleString()}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3 font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="text-gray-500">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;