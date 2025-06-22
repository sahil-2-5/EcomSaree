
import React from "react";
import { FiEdit2, FiPlus, FiFilter } from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";

const inventory = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    sku: "BSS001",
    category: "Silk Sarees",
    stock: 25,
    price: 8500,
    supplier: "Varanasi Textiles",
    updated: "2024-07-20",
  },
  {
    id: 2,
    name: "Cotton Handloom Saree",
    sku: "CHS002",
    category: "Cotton Sarees",
    stock: 5,
    price: 2200,
    supplier: "Handloom Co-op",
    updated: "2024-07-18",
  },
  {
    id: 3,
    name: "Designer Georgette Saree",
    sku: "DGS003",
    category: "Designer Sarees",
    stock: 18,
    price: 4800,
    supplier: "Fashion House",
    updated: "2024-07-22",
  },
  {
    id: 4,
    name: "Traditional Kanjivaram",
    sku: "TKS004",
    category: "Silk Sarees",
    stock: 12,
    price: 12000,
    supplier: "Chennai Silks",
    updated: "2024-07-19",
  },
];

const Inventory = () => {
  const totalProducts = 1234;
  const lowStock = 23;
  const outOfStock = 5;
  const totalValue = "₹12.5L";

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700">
            <FiPlus className="w-5 h-5 mr-2" />
            Add Stock
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-xl font-bold">{totalProducts.toLocaleString()}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h2 className="text-xl font-bold text-red-600">{lowStock}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <h2 className="text-xl font-bold text-red-600">{outOfStock}</h2>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Total Value</p>
            <h2 className="text-xl font-bold text-gray-900">{totalValue}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
          <select className="border px-3 py-2 rounded">
            <option>Category</option>
            <option>Silk Sarees</option>
            <option>Cotton Sarees</option>
            <option>Designer Sarees</option>
          </select>
          <button className="inline-flex items-center border px-4 py-2 rounded hover:bg-gray-50 text-sm text-gray-700">
            <FiFilter className="mr-2" />
            Filter
          </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 uppercase">
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Supplier</th>
                <th className="p-4 text-left">Last Updated</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-700">{item.sku}</td>
                  <td className="p-4 text-gray-700">{item.category}</td>
                  <td className="p-4 text-gray-700">
                    {item.stock}
                    {item.stock <= 5 && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
                        Low
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-700">{item.supplier}</td>
                  <td className="p-4 text-gray-700">{item.updated}</td>
                  <td className="p-4 flex gap-3 text-gray-700">
                    <button title="Edit">
                      <FiEdit2 className="hover:text-blue-600" />
                    </button>
                    <button title="Add">
                      <FiPlus className="hover:text-green-600" />
                    </button>
                  </td>
                </tr>
              ))}
              {inventory.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    No inventory data found.
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

export default Inventory;