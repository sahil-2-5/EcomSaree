import React from 'react';
import { 
  FiShoppingBag, 
  FiDollarSign, 
  FiUsers, 
  FiTrendingUp,
  FiPackage,
  FiAlertCircle
} from 'react-icons/fi';
import AdminLayout from '../components/admin/AdminPanel';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <FiTrendingUp className={`w-4 h-4 ${color}`} />
            <span className={`text-sm ${color} ml-1`}>{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color.replace('text', 'bg')}/10`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

const RecentOrders = () => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b">
      <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Products</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[
            {
              id: 'ORD123',
              customer: 'Priya Sharma',
              products: 2,
              total: '₹31,998',
              status: 'Processing',
            },
            {
              id: 'ORD124',
              customer: 'Meera Patel',
              products: 1,
              total: '₹15,999',
              status: 'Delivered',
            },
            {
              id: 'ORD125',
              customer: 'Anjali Desai',
              products: 3,
              total: '₹47,997',
              status: 'Shipped',
            },
          ].map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.products}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.total}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'Processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const LowStockAlert = () => (
  <div className="bg-white rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b">
      <h3 className="text-lg font-medium text-gray-900">Low Stock Alert</h3>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        {[
          {
            name: 'Banarasi Silk Saree',
            stock: 2,
            threshold: 5,
          },
          {
            name: 'Kanjivaram Silk Saree',
            stock: 3,
            threshold: 5,
          },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
          >
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.stock} items remaining
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-pink-600 hover:text-pink-700">
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Orders"
            value="1,234"
            icon={FiShoppingBag}
            trend="+12.5%"
            color="text-blue-600"
          />
          <StatCard
            title="Total Revenue"
            value="₹12,34,567"
            icon={FiDollarSign}
            trend="+8.2%"
            color="text-green-600"
          />
          <StatCard
            title="Total Customers"
            value="892"
            icon={FiUsers}
            trend="+5.1%"
            color="text-purple-600"
          />
          <StatCard
            title="Total Products"
            value="156"
            icon={FiPackage}
            trend="+3.7%"
            color="text-pink-600"
          />
        </div>

        {/* Recent Orders */}
        <RecentOrders />

        {/* Low Stock Alert */}
        <LowStockAlert />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
