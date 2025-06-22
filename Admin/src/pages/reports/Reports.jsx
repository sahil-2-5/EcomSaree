
import React from "react";
import { FiDownload } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";

const Reports = () => {
  const topSelling = [
    { name: "Banarasi Silk Saree", units: 45, revenue: 382500 },
    { name: "Designer Georgette", units: 32, revenue: 153600 },
    { name: "Cotton Handloom", units: 28, revenue: 61600 },
    { name: "Kanjivaram Silk", units: 22, revenue: 264000 },
  ];

  const recentActivity = [
    {
      text: "New order placed",
      detail: "Order #ORD124 – ₹8,500",
      time: "2 minutes ago",
    },
    {
      text: "Customer registered",
      detail: "Meera Patel joined",
      time: "15 minutes ago",
    },
    {
      text: "Inventory updated",
      detail: "Silk Sarees restocked",
      time: "1 hour ago",
    },
    {
      text: "Payment received",
      detail: "Order #ORD123 – ₹12,000",
      time: "2 hours ago",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="flex gap-2">
            <select className="border px-3 py-2 rounded text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This month</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FiDownload className="w-5 h-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold text-gray-900">₹2,45,680</h2>
            <p className="text-sm text-green-600">▲ +12.5% from last month</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold text-gray-900">1,234</h2>
            <p className="text-sm text-green-600">▲ +8.2% from last month</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">New Customers</p>
            <h2 className="text-xl font-bold text-gray-900">89</h2>
            <p className="text-sm text-red-500">▼ -3.1% from last month</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Avg Order Value</p>
            <h2 className="text-xl font-bold text-gray-900">₹1,992</h2>
            <p className="text-sm text-green-600">▲ +5.7% from last month</p>
          </div>
        </div>

        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Selling Products */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
            <ul className="divide-y">
              {topSelling.map((item, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.units} units sold</p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{item.revenue.toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <ul className="space-y-4 text-sm">
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-pink-600 inline-block"></span>
                  <div>
                    <p className="text-gray-900 font-medium">{activity.text}</p>
                    <p className="text-gray-600">{activity.detail}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;