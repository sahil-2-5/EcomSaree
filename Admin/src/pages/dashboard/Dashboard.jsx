import React, { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";
import AdminLayout from "../../components/admin/AdminPanel";
import { useOrderContext } from "../../context/OrderContext";
import { useProductContext } from "../../context/ProductContext";

const StatCard = ({ title, value, trend, color, icon }) => {
  const icons = {
    sales: <FiDollarSign className="text-2xl text-gray-400" />,
    orders: <FiShoppingBag className="text-2xl text-gray-400" />,
    products: <FiPackage className="text-2xl text-gray-400" />,
    customers: <FiUsers className="text-2xl text-gray-400" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <FiTrendingUp className={`w-4 h-4 ${color}`} />
            <span className={`text-sm ${color} ml-1`}>
              {trend} from last month
            </span>
          </div>
        </div>
        {icons[icon]}
      </div>
    </div>
  );
};

const RecentOrders = ({ orders }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        <p className="text-sm text-gray-500">
          Latest orders from your customers
        </p>
      </div>
      <div className="divide-y">
        {orders.slice(0, 4).map((order) => (
          <div
            key={order._id}
            className="px-6 py-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{order.orderId}</p>
              <p className="text-sm text-gray-500">
                {order.shippingAddress?.name || "Unknown Customer"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatCurrency(order.totalAmount)}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  statusStyles[order.orderStatus] || "bg-gray-100 text-gray-800"
                }`}
              >
                {formatStatus(order.orderStatus)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LowStockAlert = ({ products }) => {
  const lowStockProducts = products.filter(
    (product) => product.availableQuantity < 10
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <FiAlertCircle className="text-red-500 mr-2" />
          Low Stock Alert
        </h3>
        <p className="text-sm text-gray-500">Products that need restocking</p>
      </div>
      <div className="p-6 space-y-3">
        {lowStockProducts.slice(0, 3).map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center bg-red-50 p-4 rounded-lg"
          >
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-gray-500">SKU: {product._id.slice(-6)}</p>
            </div>
            <div className="text-right">
              <p className="text-red-600 font-medium text-sm mb-1">
                {product.availableQuantity} left
              </p>
              <p className="text-sm font-semibold">
                {formatCurrency(product.sellingPrice || product.price)}
              </p>
            </div>
          </div>
        ))}
        {lowStockProducts.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No low stock products
          </p>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { orders } = useOrderContext();
  const { products } = useProductContext();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeProducts: 0,
    totalCustomers: 0,
    salesChange: 0,
    ordersChange: 0,
    productsChange: 0,
    customersChange: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      // Calculate current month stats
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Completed orders (for sales calculation)
      const completedOrders = orders.filter(
        order => order.paymentStatus === 'completed' && order.isPaid
      );
      
      // Current month orders
      const currentMonthOrders = completedOrders.filter(
        order => new Date(order.createdAt) >= currentMonthStart
      );
      
      // Previous month orders
      const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      const prevMonthOrders = completedOrders.filter(
        order => new Date(order.createdAt) >= prevMonthStart && 
                new Date(order.createdAt) <= prevMonthEnd
      );
      
      // Calculate totals
      const totalSales = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const currentMonthSales = currentMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const prevMonthSales = prevMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Calculate changes
      const salesChange = prevMonthSales > 0 
        ? Math.round(((currentMonthSales - prevMonthSales) / prevMonthSales) * 100) 
        : 100;
      
      const totalOrders = orders.length;
      const currentMonthOrdersCount = currentMonthOrders.length;
      const prevMonthOrdersCount = prevMonthOrders.length;
      const ordersChange = prevMonthOrdersCount > 0 
        ? Math.round(((currentMonthOrdersCount - prevMonthOrdersCount) / prevMonthOrdersCount) * 100) 
        : 100;
      
      // Products
      const activeProducts = products.filter(p => p.status === 'active').length;
      const currentMonthProducts = products.filter(
        p => p.status === 'active' && new Date(p.createdAt) >= currentMonthStart
      ).length;
      const prevMonthProducts = products.filter(
        p => p.status === 'active' && 
             new Date(p.createdAt) >= prevMonthStart && 
             new Date(p.createdAt) <= prevMonthEnd
      ).length;
      const productsChange = prevMonthProducts > 0 
        ? Math.round(((currentMonthProducts - prevMonthProducts) / prevMonthProducts) * 100) 
        : 100;
      
      // Customers (estimated from orders)
      const uniqueCustomers = [...new Set(orders.map(order => order.user?.toString()))].length;
      const currentMonthCustomers = [...new Set(
        currentMonthOrders.map(order => order.user?.toString())
      )].length;
      const prevMonthCustomers = [...new Set(
        prevMonthOrders.map(order => order.user?.toString())
      )].length;
      const customersChange = prevMonthCustomers > 0 
        ? Math.round(((currentMonthCustomers - prevMonthCustomers) / prevMonthCustomers) * 100) 
        : 100;

      setStats({
        totalSales,
        totalOrders,
        activeProducts,
        totalCustomers: uniqueCustomers,
        salesChange,
        ordersChange,
        productsChange,
        customersChange,
      });
    };

    calculateStats();
  }, [orders, products]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Sales"
            value={formatCurrency(stats.totalSales)}
            trend={`${stats.salesChange > 0 ? '+' : ''}${stats.salesChange}%`}
            color={stats.salesChange >= 0 ? "text-green-600" : "text-red-600"}
            icon="sales"
          />
          <StatCard
            title="Total Orders"
            value={formatNumber(stats.totalOrders)}
            trend={`${stats.ordersChange > 0 ? '+' : ''}${stats.ordersChange}%`}
            color={stats.ordersChange >= 0 ? "text-blue-600" : "text-red-600"}
            icon="orders"
          />
          <StatCard
            title="Active Products"
            value={formatNumber(stats.activeProducts)}
            trend={`${stats.productsChange > 0 ? '+' : ''}${stats.productsChange}%`}
            color={stats.productsChange >= 0 ? "text-purple-600" : "text-red-600"}
            icon="products"
          />
          <StatCard
            title="Total Customers"
            value={formatNumber(stats.totalCustomers)}
            trend={`${stats.customersChange > 0 ? '+' : ''}${stats.customersChange}%`}
            color={stats.customersChange >= 0 ? "text-pink-600" : "text-red-600"}
            icon="customers"
          />
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          <RecentOrders orders={orders} />
        </div>

        <LowStockAlert products={products} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;