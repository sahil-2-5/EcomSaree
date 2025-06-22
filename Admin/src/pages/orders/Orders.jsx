import React, { useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "ORD123",
      customer: { name: "Priya Sharma", email: "priya.sharma@example.com" },
      date: "2024-01-15",
      total: 31996,
      items: 3,
      status: "processing",
      paymentMethod: "UPI",
    },
    {
      id: "ORD124",
      customer: { name: "Rajesh Kumar", email: "rajesh.kumar@example.com" },
      date: "2024-01-16",
      total: 8500,
      items: 1,
      status: "shipped",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD125",
      customer: { name: "Anita Desai", email: "anita.desai@example.com" },
      date: "2024-01-17",
      total: 15200,
      items: 2,
      status: "delivered",
      paymentMethod: "Net Banking",
    },
    {
      id: "ORD126",
      customer: { name: "Vikram Singh", email: "vikram.singh@example.com" },
      date: "2024-01-18",
      total: 4800,
      items: 1,
      status: "cancelled",
      paymentMethod: "UPI",
    },
  ];

  const statusCount = {
    total: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const handleExport = () => {
    console.log("Export orders");
  };

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">{statusCount.total}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Processing</p>
            <h2 className="text-xl font-bold text-yellow-500">
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
          />
          <select className="border px-3 py-2 rounded">
            <option>Status</option>
          </select>
          <select className="border px-3 py-2 rounded">
            <option>Date Range</option>
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{order.id}</td>
                  <td className="p-4">
                    <div className="text-gray-800 font-medium">
                      {order.customer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.customer.email}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-700">{order.items} items</td>
                  <td className="p-4 font-medium text-gray-900">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-700">{order.paymentMethod}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "shipped"
                          ? "bg-black text-white"
                          : order.status === "delivered"
                          ? "bg-black text-white"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
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
              {orders.length === 0 && (
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

export default Orders;
