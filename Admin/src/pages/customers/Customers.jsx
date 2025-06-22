import React, { useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiDownload, FiPlus } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";

const Customers = () => {
  const customers = [
    {
      id: "CUST001",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      contact: "+91 98765 43210",
      orders: 12,
      totalSpent: 45230,
      status: "Active",
      joinDate: "2023-08-15",
    },
    {
      id: "CUST002",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      contact: "+91 87654 32109",
      orders: 8,
      totalSpent: 32150,
      status: "Active",
      joinDate: "2023-09-22",
    },
    {
      id: "CUST003",
      name: "Anita Desai",
      email: "anita.desai@example.com",
      contact: "+91 76543 21098",
      orders: 15,
      totalSpent: 67890,
      status: "VIP",
      joinDate: "2023-07-10",
    },
    {
      id: "CUST004",
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      contact: "+91 65432 10987",
      orders: 3,
      totalSpent: 12450,
      status: "Inactive",
      joinDate: "2024-01-05",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-black text-white";
      case "VIP":
        return "bg-gray-100 text-gray-800";
      case "Inactive":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FiDownload className="w-5 h-5 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700">
              <FiPlus className="w-5 h-5 mr-2" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search customers..."
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
          <select className="border px-3 py-2 rounded">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>VIP</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 uppercase">
                <th className="p-4 text-left">Customer ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Orders</th>
                <th className="p-4 text-left">Total Spent</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Join Date</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{cust.id}</td>
                  <td className="p-4">
                    <div className="text-gray-800 font-medium">{cust.name}</div>
                    <div className="text-xs text-gray-500">{cust.email}</div>
                  </td>
                  <td className="p-4 text-gray-700">{cust.contact}</td>
                  <td className="p-4 text-gray-700">{cust.orders}</td>
                  <td className="p-4 font-medium text-gray-900">
                    ₹{cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                        cust.status
                      )}`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{cust.joinDate}</td>
                  <td className="p-4 flex gap-3 text-gray-700">
                    <button title="View">
                      <FiEye className="hover:text-pink-600" />
                    </button>
                    <button title="Edit">
                      <FiEdit2 className="hover:text-blue-600" />
                    </button>
                    <button title="Delete">
                      <FiTrash2 className="hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;