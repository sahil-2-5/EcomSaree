import React from "react";
import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiPackage,
  FiAlertCircle,
  FiPlus,
  FiShoppingCart,
  FiBarChart,
} from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";

const StatCard = ({ title, value, trend, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center mt-2">
          <FiTrendingUp className={`w-4 h-4 ${color}`} />
          <span className={`text-sm ${color} ml-1`}>{trend} from last month</span>
        </div>
      </div>
    </div>
  </div>
);

const RecentOrders = () => {
  const orders = [
    {
      id: "ORD123",
      customer: "Priya Sharma",
      total: "₹31,996",
      status: "Processing",
    },
    {
      id: "ORD124",
      customer: "Rajesh Kumar",
      total: "₹8,500",
      status: "Shipped",
    },
    {
      id: "ORD125",
      customer: "Anita Desai",
      total: "₹15,200",
      status: "Delivered",
    },
    {
      id: "ORD126",
      customer: "Vikram Singh",
      total: "₹4,800",
      status: "Cancelled",
    },
  ];

  const statusStyles = {
    Processing: "bg-gray-100 text-gray-800",
    Shipped: "bg-black text-white",
    Delivered: "bg-black text-white",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        <p className="text-sm text-gray-500">Latest orders from your customers</p>
      </div>
      <div className="divide-y">
        {orders.map((order) => (
          <div key={order.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-sm text-gray-500">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{order.total}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActions = () => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b">
      <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
      <p className="text-sm text-gray-500">Common tasks and shortcuts</p>
    </div>
    <div className="grid grid-cols-2 gap-4 p-6">
      <button className="border rounded-md p-4 flex flex-col items-center text-sm hover:bg-gray-50">
        <FiPlus className="mb-2" />
        Add Product
      </button>
      <button className="border rounded-md p-4 flex flex-col items-center text-sm hover:bg-gray-50">
        <FiShoppingCart className="mb-2" />
        View Orders
      </button>
      <button className="border rounded-md p-4 flex flex-col items-center text-sm hover:bg-gray-50">
        <FiUsers className="mb-2" />
        Manage Customers
      </button>
      <button className="border rounded-md p-4 flex flex-col items-center text-sm hover:bg-gray-50">
        <FiBarChart className="mb-2" />
        View Reports
      </button>
    </div>
  </div>
);

const LowStockAlert = () => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b">
      <h3 className="text-lg font-medium text-gray-900">🚨 Low Stock Alert</h3>
      <p className="text-sm text-gray-500">Products that need restocking</p>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg">
        <div>
          <p className="font-medium">Cotton Handloom Saree</p>
          <p className="text-sm text-gray-500">SKU: CHS002</p>
        </div>
        <div className="text-right">
          <p className="text-red-600 font-medium text-sm mb-1">5 left</p>
          <button className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Restock
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="₹2,45,680"
            trend="+12.5%"
            color="text-green-600"
          />
          <StatCard
            title="Total Orders"
            value="1,234"
            trend="+8.2%"
            color="text-blue-600"
          />
          <StatCard
            title="Active Products"
            value="456"
            trend="+3.1%"
            color="text-purple-600"
          />
          <StatCard
            title="Total Customers"
            value="2,891"
            trend="+15.3%"
            color="text-pink-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders />
          <QuickActions />
        </div>

        <LowStockAlert />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
